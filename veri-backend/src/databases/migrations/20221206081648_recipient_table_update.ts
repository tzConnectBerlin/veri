import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('recipients', (table) => {
    table.integer('created_by').references('id').inTable('users').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('recipients', (table) => {
    table.dropForeign('created_by');
    table.dropColumn('created_by');
  });
}
