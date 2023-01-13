import { createHash } from 'node:crypto';

import { TRPCError } from '@trpc/server';
import { hash } from 'bcrypt';

import { sendEmail } from '@/features/mailing/server';
import { createRouter, publicProcedure } from '@/features/trpc/server';
import { Email, urlSchema } from '@/models';
import { getBaseUrl } from '@/utils';

import { confirmEmailSchema, forgotPasswordSchema, Password, registerSchema, resetPasswordSchema } from './models';
import {
  deleteEmailConfirmationCode,
  generateEmailConfirmationCode,
  getEmailConfirmationCode,
  saveEmailConfirmationCode,
} from './utils/email-confirmation-code';
import {
  deleteResetPasswordToken,
  generateResetPasswordToken,
  getResetPasswordToken,
  saveResetPasswordToken,
} from './utils/reset-password-token';

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
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid code' });
    }

    await ctx.prisma.user.update({ where: { email: input.email }, data: { emailVerified: new Date() } });

    await deleteEmailConfirmationCode(input.email);
  }),
  forgotPassword: publicProcedure.input(forgotPasswordSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({ where: { email: input.email } });

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    const token = generateResetPasswordToken();
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/auth/reset-password?email=${input.email}&token=${token}`;

    await saveResetPasswordToken(input.email, token);

    await sendEmail({
      to: { name: String(user.name), address: input.email },
      subject: 'Reset password',
      template: 'ResetPassword',
      data: { url },
    });
  }),
  resetPassword: publicProcedure.input(resetPasswordSchema).mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({ where: { email: input.email } });

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });
    }

    const savedToken = await getResetPasswordToken(input.email);

    if (!savedToken) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Token not found' });
    }

    if (savedToken !== input.token) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid token' });
    }

    const hashedPassword = await hashPassword(input.password);

    await ctx.prisma.user.update({ where: { email: input.email }, data: { password: hashedPassword } });

    await deleteResetPasswordToken(input.email);
  }),
});
