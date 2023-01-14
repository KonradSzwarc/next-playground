// eslint-disable-next-line no-restricted-imports -- import required to create a Prisma Client instance.
import { PrismaClient } from '@prisma/client';

import { serverEnv } from '../env/server';

// PrismaClient is attached to the `global` object in development to prevent exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
declare let global: { prisma?: PrismaClient };

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: serverEnv.app.is.local ? ['query', 'error', 'warn'] : ['error'],
  });

if (serverEnv.node.isNot.production) {
  global.prisma = prisma;
}
