import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('email', 45).notNullable();
    table.string('password', 255).notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable('events', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.string('name', 255).notNullable();
    table.string('description', 512).notNullable();
    table.timestamps(true, true);
  });
  await knex.schema.createTable('veris', (table) => {
    table.bigIncrements('id').unsigned().primary();
    table.integer('event').references('id').inTable('events');
    table.string('artwork', 255).notNullable();
    table.boolean('live_distribution').notNullable();
    table.string('live_distribution_url', 512);
    table.string('note', 512).notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('veris');
  await knex.schema.dropTable('events');
}
