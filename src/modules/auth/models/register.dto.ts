import { z } from 'zod';

import { emailSchema } from '@/models';

import { passwordSchema } from './password.type';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is a required field'),
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterDto = z.infer<typeof registerSchema>;
