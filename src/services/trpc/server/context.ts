import type { Session } from 'next-auth';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

import { getServerSideSession } from '@/services/auth';
import { prisma } from '@/services/db';

interface CreateContextOptions {
  session: Session | null;
}

const createInnerTRPCContext = ({ session }: CreateContextOptions) => ({ session, prisma });

export const createTRPCContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSideSession(req, res);

  return createInnerTRPCContext({ session });
};

export type TRPCContext = ReturnType<typeof createInnerTRPCContext>;
