import { z } from 'zod';

export const EMAIL_CONFIRMATION_CODE_LENGTH = 6;

export const emailConfirmationCodeSchema = z
  .string()
  .length(EMAIL_CONFIRMATION_CODE_LENGTH)
  .brand('emailConfirmationCode');

export type EmailConfirmationCode = z.infer<typeof emailConfirmationCodeSchema>;
