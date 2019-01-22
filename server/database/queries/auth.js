/* eslint-disable no-template-curly-in-string */
import db from '../config';

export default class Auth {
  static signup(user) {
    return db.one(
      'INSERT INTO users(firstname, lastname, othernames, email, phonenumber, username, hash) VALUES(${firstname}, ${lastname}, ${othernames}, ${email}, ${phonenumber}, ${username}, ${hash}) RETURNING *',
      user,
    );
  }

  static login(email) {
    return db.one('SELECT * FROM users WHERE email=$1', [email]);
  }
}
