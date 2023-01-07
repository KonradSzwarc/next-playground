import type { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: process.env.DATABASE_DEBUG === 'true',
  migrations: {
    extension: 'ts',
    directory: './src/server/db/migrations',
  },
  seeds: {
    extension: 'ts',
    directory: './src/server/db/seeds',
  },
};

export default config;
