import type { Session } from 'next-auth';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { getServerSideSession } from '@/features/next-auth';
import { prisma } from '@/features/prisma';

interface CreateContextOptions {
  session: Session | null;
}

const createInnerTRPCContext = ({ session }: CreateContextOptions) => ({ session, prisma });

export const createTRPCContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSideSession(req, res);

  return createInnerTRPCContext({ session });
};

export type TRPCContext = ReturnType<typeof createInnerTRPCContext>;
