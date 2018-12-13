import dotenv from 'dotenv';
import Bluebird from 'bluebird';
import pgPromise from 'pg-promise';

dotenv.config();

const pg = pgPromise({ promiseLib: Bluebird });
const config = {
  host: 'localhost',
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  database: 'ireporter',
};
const db = pg(process.env.DATABASE_URL || config);

export default db;
