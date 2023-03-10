import { randomUUID } from 'node:crypto';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { Account, NextAuthOptions, Profile } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcrypt';
import { getCookie, setCookie } from 'cookies-next';
import { add } from 'date-fns';
import { get } from 'lodash';

import { prisma } from '@/features/prisma';

import { serverEnv } from '../env/server';
import { sessionUserSchema } from './models';
import { getSeconds } from './utils';

type SsrRequest = GetServerSidePropsContext['req'];
type SsrResponse = GetServerSidePropsContext['res'];
type SsrResult = [req: SsrRequest, res: SsrResponse, options: NextAuthOptions];

type NextApiResult = [req: NextApiRequest, res: NextApiResponse, options: NextAuthOptions];

type Request = NextApiRequest | SsrRequest;
type Response = NextApiResponse | SsrResponse;

interface Credentials {
  email?: string;
  password?: string;
}

const sessionCookie = 'next-auth.session-token';

const sessionConfig = {
  strategy: 'database',
  maxAge: getSeconds('30d'),
  updateAge: getSeconds('1d'),
} satisfies NextAuthOptions['session'];

const isApiRequest = (req: Request): req is NextApiRequest => 'query' in req || 'body' in req;

const canSignInWithOAuth = (account: Account | null, profile?: Profile) =>
  account?.provider === 'google' ? Boolean(get(profile, 'email_verified')) : true;

const isCredentialsAuth = (req: Request) =>
  isApiRequest(req) &&
  Boolean(
    req.query.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST',
  );

const getUserForCredentials = async ({ email = '', password = '' }: Credentials = {}) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user?.emailVerified) return null;

  const arePasswordsEqual = user.password && compare(password, user.password);

  if (!arePasswordsEqual) return null;

  return sessionUserSchema.parse(user);
};

export function getNextAuthParams(req: NextApiRequest, res: NextApiResponse): NextApiResult;
export function getNextAuthParams(req: SsrRequest, res: SsrResponse): SsrResult;
export function getNextAuthParams(req: Request, res: Response): SsrResult | NextApiResult {
  const adapter = PrismaAdapter(prisma);

  const authTypes = <R1, R2>(fns: { credentials: () => R1; oauth: () => R2 }): R1 | R2 =>
    isCredentialsAuth(req) ? fns.credentials() : fns.oauth();

  const createCredentialsSession = async (userId: string) => {
    const sessionToken = randomUUID();
    const expires = add(new Date(), { seconds: sessionConfig.maxAge });

    await adapter.createSession({ userId, sessionToken, expires });

    setCookie(sessionCookie, sessionToken, { req, res, expires });
  };

  const encodeCredentialsCookie = () => {
    const cookie = getCookie(sessionCookie, { req, res });

    return typeof cookie === 'string' ? cookie : '';
  };

  const options: NextAuthOptions = {
    adapter,
    session: sessionConfig,
    pages: {
      signIn: '/auth/login',
    },
    providers: [
      GitHubProvider({
        ...serverEnv.oauth.github,
        allowDangerousEmailAccountLinking: true,
      }),
      GoogleProvider({
        ...serverEnv.oauth.google,
        allowDangerousEmailAccountLinking: true,
      }),
      CredentialProvider({
        name: 'CredentialProvider',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: getUserForCredentials,
      }),
    ],
    callbacks: {
      session: ({ session, user }) => ({ ...session, user: sessionUserSchema.parse(user) }),
      signIn: ({ user, account, profile }) =>
        authTypes({
          credentials: () => createCredentialsSession(user.id).then(() => true),
          oauth: () => canSignInWithOAuth(account, profile),
        }),
    },
    jwt: {
      encode: (params) =>
        authTypes({
          credentials: () => encodeCredentialsCookie(),
          oauth: () => encode(params),
        }),
      decode: (params) =>
        authTypes({
          credentials: () => null,
          oauth: () => decode(params),
        }),
    },
  };

  return [req, res, options];
}
