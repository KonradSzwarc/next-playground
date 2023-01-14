import { z } from 'zod';

import { urlSchema } from '@/models';

export const clientSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  APP_ENV: z.enum(['local', 'preview', 'staging', 'production']),
  VERCEL_URL: urlSchema.optional(),
});

const parsedClientEnv = clientSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
});

if (!parsedClientEnv.success) {
  console.error('❌ Invalid environment variables:\n', parsedClientEnv.error.format());

  throw new Error('Invalid environment variables');
}

const { data: env } = parsedClientEnv;

export const clientEnv = {
  node: {
    is: {
      development: env.NODE_ENV === 'development',
      test: env.NODE_ENV === 'test',
      production: env.NODE_ENV === 'production',
    },
    isNot: {
      development: env.NODE_ENV !== 'development',
      test: env.NODE_ENV !== 'test',
      production: env.NODE_ENV !== 'production',
    },
  },
  app: {
    is: {
      local: env.APP_ENV === 'local',
      preview: env.APP_ENV === 'preview',
      staging: env.APP_ENV === 'staging',
      production: env.APP_ENV === 'production',
    },
    isNot: {
      local: env.APP_ENV !== 'local',
      preview: env.APP_ENV !== 'preview',
      staging: env.APP_ENV !== 'staging',
      production: env.APP_ENV !== 'production',
    },
  },
  vercel: {
    url: env.VERCEL_URL,
  },
};
