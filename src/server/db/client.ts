// eslint-disable-next-line no-restricted-imports -- import required to create a Prisma Client instance.
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices
declare let global: { client?: PrismaClient };

export const client =
  global.client ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.client = client;
}
