import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';

import type { TRPCContext } from './context';

const { router, middleware, procedure } = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape }) => shape,
});

const enforceUserIsAuthed = middleware(({ ctx, next }) => {
  if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({ ctx: { session: { ...ctx.session, user: ctx.session.user } } });
});

export const createRouter = router;

export const publicProcedure = procedure;

export const protectedProcedure = procedure.use(enforceUserIsAuthed);
