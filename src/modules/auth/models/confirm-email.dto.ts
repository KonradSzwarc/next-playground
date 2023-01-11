import { z } from 'zod';

export const CONFIRM_EMAIL_CODE_LENGTH = 6;

export const confirmEmailSchema = z.object({
  code: z.string().length(CONFIRM_EMAIL_CODE_LENGTH),
});

export type ConfirmEmailDto = z.infer<typeof confirmEmailSchema>;
