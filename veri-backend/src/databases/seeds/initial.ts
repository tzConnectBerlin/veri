import { Knex } from 'knex';
import bcrypt from 'bcryptjs';
import { ADMIN_USER } from '../../constants/admin';

const hash = bcrypt.hashSync(ADMIN_USER.password, 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([{ email: ADMIN_USER.email, password: hash }]);
}
