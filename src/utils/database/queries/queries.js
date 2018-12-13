/* eslint-disable no-template-curly-in-string */
import db from '../config';

export const insertAdmin = user => db.one(
  'INSERT INTO users (firstname, lastname, othernames, email, phoneNumber, username, passwordHash, isAdmin) VALUES (${firstname}, ${lastname}, ${othernames}, ${email}, ${phoneNumber}, ${username}, ${passwordHash}, true) RETURNING *',
  user,
);

export const getIncident = id => db.one('SELECT * FROM incidents WHERE id=$1', id);

export const deleteAll = relation => db.none(`DELETE FROM ${relation}`);
