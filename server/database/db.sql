DROP DATABASE IF EXISTS ireporter;
CREATE DATABASE ireporter;

\c ireporter;

-- CUSTOM TYPES

CREATE TYPE incident AS ENUM ('red-flag', 'intervention');
CREATE TYPE status AS ENUM ('draft', 'under investigation', 'rejected', 'resolved');

--  USERS TABLE

CREATE TABLE users (
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
);

-- INCIDENTS TABLE

CREATE TABLE incidents (
  ID serial PRIMARY KEY,
  createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy int references users(ID) NOT NULL,
  type incident NOT NULL,
  location varchar NOT NULL,
  status status NOT NULL DEFAULT 'draft',
  Images varchar[] DEFAULT '{}',
  Videos varchar[] DEFAULT '{}',
  comment varchar NOT NULL
);
