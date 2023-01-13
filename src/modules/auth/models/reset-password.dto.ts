import { z } from 'zod';

import { emailSchema } from '@/models';

import { passwordSchema } from './password.type';

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  email: emailSchema,
  token: z.string(),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
