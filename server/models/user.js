import bcrypt from 'bcrypt';

export default class User {
  constructor({
    firstname, lastname, othernames, email, phonenumber, username, password,
  }) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.othernames = othernames || null;
    this.email = email;
    this.phonenumber = phonenumber || null;
    this.username = username;
    this.hash = User.hashPassword(password);
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
