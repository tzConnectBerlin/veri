import {
  DB_PROTOCOL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from './src/config';

const connectionString = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const dbConfig = {
  client: 'pg',
  connection: connectionString,
  migrations: {
    directory: 'src/databases/migrations',
    tableName: 'migrations',
    // stub: 'src/databases/stubs',
  },
  seeds: {
    directory: 'src/databases/seeds',
    // stub: 'src/databases/stubs',
  },
};

export default dbConfig;
