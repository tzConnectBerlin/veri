import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('recipients', (table) => {
    table.string('operation', 512);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('recipients', (table) => {
    table.dropColumn('operation');
  });
}
