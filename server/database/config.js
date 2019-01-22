import dotenv from 'dotenv';
import Bluebird from 'bluebird';
import pgPromise from 'pg-promise';

dotenv.config();

const pg = pgPromise({ promiseLib: Bluebird });
const db = pg(process.env.DATABASE_URL);

export default db;
