import { config } from 'dotenv';

if (process.env.NODE_ENV && process.env.NODE_ENV == 'development')
  config({ path: `.env.development.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_PROTOCOL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  PEPPERMINTERY_URL,
  DATA_PATH,
} = process.env;
