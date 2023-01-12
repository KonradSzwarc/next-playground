import { createHash } from 'node:crypto';

import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';
import ms from 'ms';

import { sendEmail } from '@/features/mailing/server';
import { createRouter, publicProcedure } from '@/features/trpc/server';
import { Email, urlSchema } from '@/models';

import { confirmEmailSchema, generateEmailConfirmationCode, Password, registerSchema } from './models';

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

    const emailConfirmationCode = generateEmailConfirmationCode();

    await ctx.prisma.emailConfirmationCode.create({
      data: {
        email: input.email,
        code: emailConfirmationCode,
        expires: new Date(Date.now() + ms('24h')),
      },
    });

    await sendEmail({
      to: { name: input.name, address: input.email },
      subject: 'Welcome to Next Playground',
      template: 'ConfirmEmail',
      data: { code: emailConfirmationCode },
    });
  }),
  confirmEmail: publicProcedure.input(confirmEmailSchema).mutation(async ({ ctx, input }) => {
    const token = await ctx.prisma.emailConfirmationCode.findUnique({ where: { email: input.email } });

    if (!token) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Token not found' });
    }

    if (token.code !== input.code) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid code' });
    }

    if (token.expires < new Date()) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Token expired' });
    }

    await ctx.prisma.emailConfirmationCode.delete({ where: { email: input.email } });
    await ctx.prisma.user.update({ where: { email: input.email }, data: { emailVerified: new Date() } });
  }),
});
