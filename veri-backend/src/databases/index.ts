import Knex from 'knex';
// import {
//   DB_PROTOCOL,
//   DB_HOST,
//   DB_PORT,
//   DB_USER,
//   DB_PASSWORD,
//   DB_DATABASE,
// } from '../config';

// const connectionString = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const dbConnection = {
  client: 'pg',
  connection: 'postgresql://veri:veri@localhost:5432/veri',
};

export default Knex(dbConnection);
