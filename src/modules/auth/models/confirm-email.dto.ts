import { z } from 'zod';

import { emailSchema } from '@/models';

import { emailConfirmationCodeSchema } from './email-confirmation-code.type';

export const confirmEmailSchema = z.object({
  code: emailConfirmationCodeSchema,
  email: emailSchema,
});

export type ConfirmEmailDto = z.infer<typeof confirmEmailSchema>;
