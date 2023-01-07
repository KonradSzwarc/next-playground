import type { Knex } from 'knex';

import { withIdColumn, withTimestampsColumns } from '../helpers';
import { onUpdateTrigger } from '../triggers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      withIdColumn(knex, table);
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.timestamp('emailVerified').nullable().defaultTo(null);
      table.string('image').notNullable();
      withTimestampsColumns(knex, table);
    })
    .raw(onUpdateTrigger.createForTable('users'));
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users').raw(onUpdateTrigger.dropForTable('users'));
}
