import { Knex } from 'knex';
import bcrypt from 'bcrypt';

const password = 'veriisawesome'; //has to come from env var SECRET_KEY

const hash = bcrypt.hashSync(password, 10);

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { email: 'superadmin@veri.com', password: hash },
  ]);
}
