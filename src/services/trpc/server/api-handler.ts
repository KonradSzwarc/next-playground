import { createNextApiHandler } from '@trpc/server/adapters/next';

import { appRouter } from '../routers/_app';
import { createTRPCContext } from './context';

export const createTrpcApiHandler = () =>
  createNextApiHandler({
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined,
  });
