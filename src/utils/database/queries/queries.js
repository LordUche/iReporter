/* eslint-disable no-template-curly-in-string */
import db from '../config';

export const createIncidentsTable = () => db.none(`CREATE TABLE IF NOT EXISTS incidents (
  ID serial PRIMARY KEY,
  createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy int references users(ID),
  type incidentType NOT NULL,
  location varchar NOT NULL,
  status status NOT NULL DEFAULT 'draft',
  Images varchar[] DEFAULT '{}',
  Videos varchar[] DEFAULT '{}',
  comment varchar NOT NULL
);
`);

export const createUsersTable = () => db.none(`CREATE TABLE IF NOT EXISTS users (
  ID serial PRIMARY KEY,
  firstname varchar NOT NULL,
  lastname varchar NOT NULL,
  othernames varchar,
  email varchar NOT NULL UNIQUE,
  phoneNumber varchar NOT NULL UNIQUE,
  username varchar NOT NULL UNIQUE,
  registered timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  isAdmin boolean NOT NULL DEFAULT false,
  passwordHash varchar NOT NULL
);
`);

export const dropTable = tableName => db.none(`DROP TABLE IF EXISTS ${tableName}`);

export const insertUser = user => db.one(
  'INSERT INTO users (firstname, lastname, othernames, email, phoneNumber, username, passwordHash) VALUES (${firstname}, ${lastname}, ${othernames}, ${email}, ${phoneNumber}, ${username}, ${passwordHash}) RETURNING *',
  user,
);

export const insertAdmin = user => db.one(
  'INSERT INTO users (firstname, lastname, othernames, email, phoneNumber, username, passwordHash, isAdmin) VALUES (${firstname}, ${lastname}, ${othernames}, ${email}, ${phoneNumber}, ${username}, ${passwordHash}, true) RETURNING *',
  user,
);
