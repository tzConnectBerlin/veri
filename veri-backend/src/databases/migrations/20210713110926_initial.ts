import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('email', 45).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable('veris', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('event_name', 45).notNullable();
    table.string('event_description', 512);
    table.string('event_contact_email', 45).notNullable();
    table.string('event_type').notNullable();
    table.datetime('event_start_date', { useTz: true }).notNullable();
    table.datetime('event_end_date', { useTz: true }).notNullable();
    table.string('artwork_name', 255).notNullable();
    table.string('artwork_description', 512);
    table.string('artwork_filepath', 512);
    table.boolean('live_distribution').notNullable();
    table.string('live_distribution_url', 512);
    table.integer('created_by').references('id').inTable('users').defaultTo(1);
    table.integer('updated_by').references('id').inTable('users').defaultTo(1);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('veris');
  await knex.schema.dropTable('users');
}
