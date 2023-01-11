import { authRouter } from '@/modules/auth/server';

import { createRouter } from '../server/utils';
import { exampleRouter } from './example';

export const appRouter = createRouter({
  example: exampleRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
