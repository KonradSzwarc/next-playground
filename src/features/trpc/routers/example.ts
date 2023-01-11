import { z } from 'zod';

import { createRouter, protectedProcedure, publicProcedure } from '../server/utils';

export const exampleRouter = createRouter({
  getMessage: publicProcedure
    .input(z.object({ text: z.string() }))
    .output(z.object({ greeting: z.string() }))
    .query(({ input }) => ({ greeting: `Hello ${input.text}` })),

  getSecretMessage: protectedProcedure.output(z.string()).query(() => 'you can now see this secret message!'),
});
