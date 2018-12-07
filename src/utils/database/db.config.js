import Bluebird from "bluebird";
import pgPromise from "pg-promise";

const pg = pgPromise({ promiseLib: Bluebird });
const config = {
  host: "localhost",
  port: 5432,
  database: "ireporter",
  username: "postgres",
  password: "postgres"
};
const db = pg(process.env.DATABASE_URL || config);

export default db;
