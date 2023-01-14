import Redis from 'ioredis';

import { serverEnv } from '../env/server';

declare let global: { redis?: Redis };

export const redis = global.redis ?? new Redis(serverEnv.redis);

if (serverEnv.node.isNot.production) {
  global.redis = redis;
}
