import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.string('organizer', 255).alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.string('organizer', 32).alter();
  });
}
