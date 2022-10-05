import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('email', 64).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable('files', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('fieldname', 16).notNullable();
    table.string('originalname', 128);
    table.string('encoding', 6).notNullable();
    table.string('mimetype', 16).notNullable();
    table.string('destination', 255).notNullable();
    table.string('filename', 64).notNullable();
    table.string('path', 255).notNullable();
    table.string('size', 8);
    table.timestamps(true, true);
  });
  await knex.schema.createTable('veris', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('event_name', 64).notNullable();
    table.string('event_description', 512);
    table.string('event_contact_email', 64).notNullable();
    table.string('event_type').notNullable();
    table.datetime('event_start_date', { useTz: true }).notNullable();
    table.datetime('event_end_date', { useTz: true }).notNullable();
    table.string('artwork_name', 255).notNullable();
    table.string('artwork_description', 512);
    table.boolean('live_distribution').notNullable();
    table.string('live_distribution_url', 512);
    table.integer('file_id').references('id').inTable('files').notNullable();
    table.integer('created_by').references('id').inTable('users').defaultTo(1);
    table.integer('updated_by').references('id').inTable('users').defaultTo(1);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('veris');
  await knex.schema.dropTable('files');
  await knex.schema.dropTable('users');
}
