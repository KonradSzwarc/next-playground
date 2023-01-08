import { randomUUID } from 'node:crypto';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { decode, encode } from 'next-auth/jwt';
import CredentialProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { getCookie, setCookie } from 'cookies-next';
import { get, pick } from 'lodash';
import ms from 'ms';

import { prisma } from '@/server/db';

const SESSION_COOKIE_NAME = 'next-auth.session-token';

const sessionConfig = {
  strategy: 'database',
  maxAge: ms('30d'),
  updateAge: ms('24h'),
} satisfies NextAuthOptions['session'];

const isCredentialsAuth = (req: NextApiRequest) =>
  Boolean(
    req.query.nextauth?.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST',
  );

const requestWrapper = (
  req: NextApiRequest,
  res: NextApiResponse,
): [req: NextApiRequest, res: NextApiResponse, options: NextAuthOptions] => {
  const adapter = PrismaAdapter(prisma);

  const createCredentialsSession = async (userId: string) => {
    const sessionToken = randomUUID();
    const expires = new Date(Date.now() + sessionConfig.maxAge);

    await adapter.createSession({ userId, sessionToken, expires });

    setCookie(SESSION_COOKIE_NAME, sessionToken, { req, res, expires });
  };

  const options: NextAuthOptions = {
    adapter,
    session: sessionConfig,
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

          return pick(user, ['id', 'email', 'name', 'image']);
        },
      }),
    ],
    callbacks: {
      session: ({ session, user }) => (session.user ? { ...session, user: { ...session.user, id: user.id } } : session),
      signIn: async ({ user, account, profile }) => {
        if (isCredentialsAuth(req)) {
          await createCredentialsSession(user.id);
        }

        return account?.provider === 'google' ? Boolean(get(profile, 'email_verified')) : true;
      },
    },
    jwt: {
      encode: (params) => {
        if (isCredentialsAuth(req)) {
          const cookie = getCookie(SESSION_COOKIE_NAME, { req, res });
          return typeof cookie === 'string' ? cookie : '';
        }

        return encode(params);
      },
      decode: (params) => {
        if (isCredentialsAuth(req)) return null;

        return decode(params);
      },
    },
  };

  return [req, res, options];
};

const handler: NextApiHandler = (...params) => NextAuth(...requestWrapper(...params));

export default handler;
