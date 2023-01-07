import type { Knex } from 'knex';

import { formatSql } from '../helpers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    formatSql(`
      CREATE OR REPLACE FUNCTION on_update_timestamp()
      RETURNS TRIGGER LANGUAGE PLPGSQL AS $$

      BEGIN
        NEW."updatedAt" = NOW();
        RETURN NEW;
      END;
      $$
  `),
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw('DROP FUNCTION IF EXISTS on_update_timestamp();');
}
