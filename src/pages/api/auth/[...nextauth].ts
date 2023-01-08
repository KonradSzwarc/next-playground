import { randomUUID } from 'node:crypto';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { getCookie, setCookie } from 'cookies-next';
import { get } from 'lodash';

import { prisma } from '@/server/db';

const SESSION_COOKIE_NAME = 'next-auth.session-token';
const CREDENTIALS_SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const generateSessionToken = () => randomUUID();

const fromDate = (time: number, date = Date.now()) => new Date(date + time * 1000);

const isCredentialsSignIn = (req: NextApiRequest) =>
  Boolean(
    req.query.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST',
  );

const requestWrapper = (req: NextApiRequest, res: NextApiResponse) => {
  const adapter = PrismaAdapter(prisma);

  const createCredentialsSession = async (userId: string) => {
    const sessionToken = generateSessionToken();
    const sessionMaxAge = CREDENTIALS_SESSION_MAX_AGE;
    const expires = fromDate(sessionMaxAge);

    await adapter.createSession({ userId, sessionToken, expires });

    setCookie(SESSION_COOKIE_NAME, sessionToken, { expires, req, res });
  };

  const options: NextAuthOptions = {
    adapter,
    providers: [
      GitHubProvider({
        clientId: String(process.env.GITHUB_CLIENT_ID),
        clientSecret: String(process.env.GITHUB_CLIENT_SECRET),
        allowDangerousEmailAccountLinking: true,
      }),
      GoogleProvider({
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
        allowDangerousEmailAccountLinking: true,
      }),
      CredentialProvider({
        name: 'CredentialProvider',
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const user = await prisma.user.findUnique({ where: { email: credentials?.email } });

          if (!user || user.password !== credentials?.password || !user.emailVerified) return null;

          return user;
        },
      }),
    ],
    callbacks: {
      session: ({ session, user }) => (session.user ? { ...session, user: { ...session.user, id: user.id } } : session),
      signIn: async ({ user, account, profile }) => {
        if (isCredentialsSignIn(req)) {
          await createCredentialsSession(user.id);
          return true;
        }

        return Boolean(account?.provider === 'google' ? get(profile, 'email_verified') : account && profile);
      },
    },
    jwt: {
      encode: ({ token, secret, maxAge }) => {
        if (isCredentialsSignIn(req)) {
          const cookie = getCookie(SESSION_COOKIE_NAME, { req, res });
          return typeof cookie === 'string' ? cookie : '';
        }

        return encode({ token, secret, maxAge });
      },
      decode: ({ token, secret }) => {
        if (isCredentialsSignIn(req)) return null;

        return decode({ token, secret });
      },
    },
  };

  return { req, res, options };
};

export const handler: NextApiHandler = (...params) => {
  const { req, res, options } = requestWrapper(...params);

  return NextAuth(req, res, options);
};

export default handler;
