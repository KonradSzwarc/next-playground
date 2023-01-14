import { createNextApiHandler } from '@trpc/server/adapters/next';

import { serverEnv } from '@/features/env/server';

import { appRouter } from '../routers/_app';
import { createTRPCContext } from './context';

export const createTrpcApiHandler = () =>
  createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError: serverEnv.app.is.local
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
        }
      : undefined,
  });
