import ms from 'ms';

import { redis } from '@/features/redis';

import { EmailConfirmationCode, emailConfirmationCodeSchema } from '../models';

export const saveEmailConfirmationCode = (email: string, code: EmailConfirmationCode) =>
  redis.set(`emailConfirmationCode:${email}`, code, 'EX', ms('24h'));

export const getEmailConfirmationCode = async (email: string) => {
  const code = await redis.get(`emailConfirmationCode:${email}`);

  if (!code) return null;

  return emailConfirmationCodeSchema.parse(code);
};

export const deleteEmailConfirmationCode = async (email: string) => redis.del(`emailConfirmationCode:${email}`);
