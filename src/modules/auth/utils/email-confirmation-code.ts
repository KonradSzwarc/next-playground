import random from 'lodash/random';
import ms from 'ms';

import { redis } from '@/features/redis';

import { EMAIL_CONFIRMATION_CODE_LENGTH, EmailConfirmationCode, emailConfirmationCodeSchema } from '../models';

export const generateEmailConfirmationCode = () =>
  emailConfirmationCodeSchema.parse(
    Array.from({ length: EMAIL_CONFIRMATION_CODE_LENGTH })
      .map(() => random(0, 9))
      .join(''),
  );

export const saveEmailConfirmationCode = (email: string, code: EmailConfirmationCode) =>
  redis.set(`emailConfirmationCode:${email}`, code, 'EX', ms('24h'));

export const getEmailConfirmationCode = async (email: string) => {
  const code = await redis.get(`emailConfirmationCode:${email}`);

  if (!code) return null;

  return emailConfirmationCodeSchema.parse(code);
};

export const deleteEmailConfirmationCode = async (email: string) => redis.del(`emailConfirmationCode:${email}`);
