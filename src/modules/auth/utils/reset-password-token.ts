import { randomBytes } from 'node:crypto';

import ms from 'ms';

import { redis } from '@/features/redis';

export const generateResetPasswordToken = () => randomBytes(32).toString('hex');

export const saveResetPasswordToken = (email: string, token: string) =>
  redis.set(`resetPasswordToken:${email}`, token, 'EX', ms('24h'));

export const getResetPasswordToken = async (email: string) => {
  const token = await redis.get(`resetPasswordToken:${email}`);

  if (!token) return null;

  return token;
};

export const deleteResetPasswordToken = async (email: string) => redis.del(`resetPasswordToken:${email}`);
