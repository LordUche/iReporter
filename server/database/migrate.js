import db from './config';

const dropIncidentType = 'DROP TYPE IF EXISTS incident';
const dropStatusType = 'DROP TYPE IF EXISTS status';
const createIncidentType = "CREATE TYPE incident AS ENUM ('red-flag', 'intervention')";
const createStatusType = "CREATE TYPE status AS ENUM ('draft', 'under investigation', 'rejected', 'resolved')";
const createUsersTable = `CREATE TABLE users (
  ID serial PRIMARY KEY,
  firstname varchar NOT NULL,
  lastname varchar NOT NULL,
  othernames varchar,
  email varchar NOT NULL UNIQUE,
  phoneNumber varchar,
  username varchar NOT NULL UNIQUE,
  registered timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  isAdmin boolean NOT NULL DEFAULT false,
  hash varchar NOT NULL
)`;
const createIncidentsTable = `CREATE TABLE incidents (
  ID serial PRIMARY KEY,
  createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy int NOT NULL references users(ID) ON DELETE CASCADE,
  type incident NOT NULL,
  location varchar NOT NULL,
  status status NOT NULL DEFAULT 'draft',
  Images varchar[] DEFAULT '{}',
  Videos varchar[] DEFAULT '{}',
  comment varchar NOT NULL
)`;

function migrate() {
  db.tx((trx) => {
    trx.batch([
      trx.none(dropIncidentType),
      trx.none(dropStatusType),
      trx.none(createIncidentType),
      trx.none(createStatusType),
      trx.none(createUsersTable),
      trx.none(createIncidentsTable),
    ])
      .then(() => console.log('MIGRATED'))
      .catch(err => console.log(`Error: ${err.message}`));
  });
}

migrate();
