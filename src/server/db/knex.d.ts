import { Knex } from 'knex';

import type { InsertUserEntity, UpdateUserEntity, UpsertUserEntity, UserEntity } from './entities/user.entity';

declare module 'knex/types/tables' {
  interface Tables {
    users: Knex.CompositeTableType<UserEntity, InsertUserEntity, UpdateUserEntity, UpsertUserEntity>;
  }
}
