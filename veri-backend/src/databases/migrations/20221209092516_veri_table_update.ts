import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.renameColumn('event_contact_email', 'organizer_email');
    table.dropColumn('event_description');
    table.string('organizer', 32);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.renameColumn('organizer_email', 'event_contact_email');
    table.string('event_description', 512);
    table.dropColumn('organizer');
  });
}
