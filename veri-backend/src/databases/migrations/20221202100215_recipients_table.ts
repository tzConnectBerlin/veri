import { Knex } from 'knex';
import onUpdateTrigger from '../functions/update_timestamp';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipients', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('task_id', 10).notNullable();
    table.string('token_id', 10).notNullable();
    table.string('address', 36).notNullable();
    table.integer('amount', 10).notNullable();
    table.string('state', 10).notNullable();
    table.timestamps(true, true);
  });
  await knex.raw(onUpdateTrigger('recipients'));
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipients');
}
