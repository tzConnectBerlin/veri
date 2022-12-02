import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.string('live_distribution_password', 64);
    table.string('status', 10);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.dropColumn('live_distribution_password');
    table.dropColumn('status');
  });
}
