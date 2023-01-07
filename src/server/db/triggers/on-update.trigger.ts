import { formatSql } from '../helpers';

export const onUpdateTrigger = {
  createForTable: (table: string) =>
    formatSql(`
      CREATE TRIGGER ${table}_updated_at
      BEFORE UPDATE ON "${table}"
      FOR EACH ROW
      EXECUTE PROCEDURE on_update_timestamp();
  `),
  dropForTable: (table: string) => `DROP TRIGGER IF EXISTS ${table}_updated_at ON "${table}"`,
};
