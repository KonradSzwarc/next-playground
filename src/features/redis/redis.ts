import Redis from 'ioredis';

declare let global: { redis?: Redis };

export const redis =
  global.redis ??
  new Redis({
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  });

if (process.env.NODE_ENV !== 'production') {
  global.redis = redis;
}
