import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { get } from 'lodash';

import { prisma } from '@/server/db';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => (session.user ? { ...session, user: { ...session.user, id: user.id } } : session),
    signIn: ({ account, profile }) =>
      Boolean(account?.provider === 'google' ? get(profile, 'email_verified') : account && profile),
  },
  adapter: PrismaAdapter(prisma),
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
  ],
};

export default NextAuth(authOptions);
