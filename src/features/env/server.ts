import { z } from 'zod';

import { nonEmptyStringSchema, portSchema, urlSchema } from '@/models';

import { clientEnv } from './client';

if (typeof window !== 'undefined') {
  throw new TypeError('Server-side environment variables should not be imported in the client-side code');
}

export const serverSchema = z.object({
  DATABASE_URL: urlSchema,

  REDIS_PORT: portSchema.transform(Number),
  REDIS_HOST: nonEmptyStringSchema,
  REDIS_PASSWORD: nonEmptyStringSchema,

  NEXTAUTH_URL: nonEmptyStringSchema,
  NEXTAUTH_SECRET: nonEmptyStringSchema,
  JWT_SECRET: nonEmptyStringSchema,

  GITHUB_CLIENT_ID: nonEmptyStringSchema,
  GITHUB_CLIENT_SECRET: nonEmptyStringSchema,

  GOOGLE_CLIENT_ID: nonEmptyStringSchema,
  GOOGLE_CLIENT_SECRET: nonEmptyStringSchema,

  EMAIL_PORT: portSchema.transform(Number),
  EMAIL_HOST: nonEmptyStringSchema,
  EMAIL_USER: nonEmptyStringSchema,
  EMAIL_PASSWORD: nonEmptyStringSchema,
  EMAIL_FROM_NAME: nonEmptyStringSchema,
  EMAIL_FROM_ADDRESS: nonEmptyStringSchema,
});

const parsedServerEnv = serverSchema.safeParse(process.env);

if (!parsedServerEnv.success) {
  console.error('❌ Invalid environment variables:\n', parsedServerEnv.error.format());

  throw new Error('Invalid environment variables');
}

const { data: env } = parsedServerEnv;

export const serverEnv = {
  ...clientEnv,
  database: {
    url: env.DATABASE_URL,
  },
  redis: {
    port: env.REDIS_PORT,
    host: env.REDIS_HOST,
    password: env.REDIS_PASSWORD,
  },
  jwt: {
    secret: env.JWT_SECRET,
  },
  nextAuth: {
    url: env.NEXTAUTH_URL,
    secret: env.NEXTAUTH_SECRET,
  },
  oauth: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  email: {
    config: {
      port: env.EMAIL_PORT,
      host: env.EMAIL_HOST,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASSWORD,
      },
    },
    from: {
      name: env.EMAIL_FROM_NAME,
      address: env.EMAIL_FROM_ADDRESS,
    },
  },
};
