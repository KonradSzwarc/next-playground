import { createRouter } from '../server/utils';
import { exampleRouter } from './example';

export const appRouter = createRouter({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
