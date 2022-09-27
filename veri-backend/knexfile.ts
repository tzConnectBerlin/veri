import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, PG_CONNECTION_STRING } from './src/config';

const dbConfig = {
  client: 'pg',
  connection: 'postgresql://veri:veri@localhost:5432/veri',
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
