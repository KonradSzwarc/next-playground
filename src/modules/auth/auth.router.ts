import { createHash } from 'node:crypto';

import { hash } from 'bcrypt';

import { sendEmail } from '@/features/mailing/server';
import { createRouter, publicProcedure } from '@/features/trpc/server';
import { Email, urlSchema } from '@/models';

import { Password, registerSchema } from './models';

const getImageUrlFromEmail = (email: Email) =>
  urlSchema.parse(`https://gravatar.com/avatar/${createHash('md5').update(email).digest('hex')}`);

const hashPassword = async (password: Password) => hash(password, 10);

export const authRouter = createRouter({
  register: publicProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const hashedPassword = await hashPassword(input.password);
    const image = getImageUrlFromEmail(input.email);

    await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
        image,
      },
    });

    await sendEmail({
      to: {
        name: input.name,
        address: input.email,
      },
      subject: 'Welcome to Next Playground',
      template: 'ConfirmEmail',
      data: { code: '123456' },
    });
  }),
});
