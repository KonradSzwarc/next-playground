import createKnexInstance, { Knex } from 'knex';

import config from './config';

declare let global: { db?: Knex };

export const db = global.db ?? createKnexInstance(config);

if (process.env.NODE_ENV !== 'production') {
  global.db = db;
}

export * from './entities';
