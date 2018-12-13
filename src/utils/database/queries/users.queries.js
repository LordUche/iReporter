/* eslint-disable no-template-curly-in-string */
import db from '../config';

export default class UsersQuery {
  static get(email) {
    return db.one('SELECT * FROM users WHERE email=$1', email);
  }

  static create(data) {
    return db.one(
      'INSERT INTO users (firstname, lastname, othernames, email, phoneNumber, username, passwordHash) VALUES (${firstname}, ${lastname}, ${othernames}, ${email}, ${phoneNumber}, ${username}, ${passwordHash}) RETURNING id, firstname, lastname, othernames, email, phoneNumber, username, isAdmin',
      data,
    );
  }
}
