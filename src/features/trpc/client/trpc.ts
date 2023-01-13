import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import superjson from 'superjson';

import { getBaseUrl } from '@/utils';

import type { AppRouter } from '../routers/_app';

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (options) =>
            process.env.NODE_ENV === 'development' || (options.direction === 'down' && options.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            networkMode: process.env.NODE_ENV === 'development' ? 'always' : 'online',
          },
        },
      },
    };
  },
});

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
