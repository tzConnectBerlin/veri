import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.integer('thumb_id').references('id').inTable('files').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('veris', (table) => {
    table.dropColumn('thumb_id');
  });
}
