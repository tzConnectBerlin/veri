import Knex from 'knex';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, PG_CONNECTION_STRING } from '../config';

const dbConnection = {
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
};

export default Knex(dbConnection);
