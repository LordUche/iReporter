/* eslint-disable no-template-curly-in-string */
import db from '../server/database/config';
import factory from './fixtures';
import User from '../server/models/user';

export function reset(tablename) {
  return db.tx(trx => trx.batch([
    trx.none(`DELETE FROM ${tablename}`),
    trx.none(`ALTER SEQUENCE ${tablename}_id_seq RESTART WITH 1`),
  ]));
}

export async function createAdmin() {
  try {
    const data = await factory.attrs('user');
    return db.one(
      'INSERT INTO users(firstname, lastname, othernames, email, phonenumber, username, hash, isadmin) VALUES(${firstname}, ${lastname}, ${othernames}, ${email}, ${phonenumber}, ${username}, ${hash}, true) RETURNING *',
      new User(data),
    );
  } catch (err) {
    return new Error(err.message);
  }
}
