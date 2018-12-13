DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS users;

-- CUSTOM TYPES

CREATE TYPE incidentType AS ENUM ('red-flag', 'intervention');
CREATE TYPE status AS ENUM ('draft', 'under investigation', 'rejected', 'resolved');

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
  isAdmin boolean NOT NULL DEFAULT false,
  passwordHash varchar NOT NULL
);

-- INCIDENTS TABLE

CREATE TABLE incidents (
  ID serial PRIMARY KEY,
  createdOn timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdBy int references users(ID) NOT NULL,
  type incidentType NOT NULL,
  location varchar NOT NULL,
  status status NOT NULL DEFAULT 'draft',
  Images varchar[] DEFAULT '{}',
  Videos varchar[] DEFAULT '{}',
  comment varchar NOT NULL
);

INSERT INTO users (firstname, lastname, othernames, email, phoneNumber, username, passwordHash, isAdmin)
VALUES('Uchenna', 'Iheanacho', 'A.', 'uchennai@live.com', '08099851353', 'lorduche', '$2b$10$EWcx.GVvDBBgOHlYR7243ON2H4wKy/nIvmrt3ZkBHj1qzIcdkT5m2', true);
