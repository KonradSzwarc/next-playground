import { createHash } from 'node:crypto';

import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';

import { sendEmail } from '@/features/mailing/server';
import { createRouter, publicProcedure } from '@/features/trpc/server';
import { Email, urlSchema } from '@/models';

import { confirmEmailSchema, generateEmailConfirmationCode, Password, registerSchema } from './models';
import { deleteEmailConfirmationCode, getEmailConfirmationCode, saveEmailConfirmationCode } from './utils';

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

    const code = generateEmailConfirmationCode();

    await saveEmailConfirmationCode(input.email, code);

    await sendEmail({
      to: { name: input.name, address: input.email },
      subject: 'Welcome to Next Playground',
      template: 'ConfirmEmail',
      data: { code },
    });
  }),
  confirmEmail: publicProcedure.input(confirmEmailSchema).mutation(async ({ ctx, input }) => {
    const code = await getEmailConfirmationCode(input.email);

    if (!code) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Confirmation code not found' });
    }

    if (code !== input.code) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid code' });
    }

    await ctx.prisma.user.update({ where: { email: input.email }, data: { emailVerified: new Date() } });

    await deleteEmailConfirmationCode(input.email);
  }),
});
