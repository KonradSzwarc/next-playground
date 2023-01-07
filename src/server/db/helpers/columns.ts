import type { Knex } from 'knex';

export const withIdColumn = (knex: Knex, table: Knex.CreateTableBuilder) => {
  table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
};

export const withTimestampsColumns = (knex: Knex, table: Knex.CreateTableBuilder) => {
  table.timestamp('createdAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
};
