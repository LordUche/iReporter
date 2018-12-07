DROP DATABASE IF EXISTS ireporter;
CREATE DATABASE ireporter;

\c ireporter;

-- CUSTOM TYPES 

CREATE TYPE incidentType AS ENUM ('red-flag', 'intervention');
CREATE TYPE status AS ENUM ('draft', 'under investigation', 'rejected', 'resolved');
CREATE TYPE location AS (
   latitude decimal,
   longitude decimal
);

--  USERS TABLE

CREATE TABLE users (
  ID serial PRIMARY KEY,
  firstname varchar NOT NULL,
  lastname varchar NOT NULL,
  othernames varchar,
  email varchar NOT NULL UNIQUE,
  phoneNumber varchar NOT NULL UNIQUE,
  username varchar NOT NULL UNIQUE,
  registered timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  isAdmin boolean NOT NULL DEFAULT false
);

-- INCIDENTS TABLE

CREATE TABLE incidents (
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

INSERT INTO users(firstname, lastname, email, phoneNumber, username)
VALUES('Uchenna', 'Iheanacho', 'uchennai@live.com', '08099851353', 'LordUche');

INSERT INTO users(firstname, lastname, email, phoneNumber, username, isAdmin)
VALUES('Mohammed', 'Isioye', 'isioye.mohammed@andela.com', '07014970830', 'mosdef', true);
