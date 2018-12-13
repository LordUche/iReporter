export default class User {
  constructor({
    firstname,
    lastname,
    othernames,
    email,
    phoneNumber,
    username,
    registered = new Date(),
    isAdmin = false,
    id = null,
  }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.othernames = othernames;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.registered = registered;
    this.isAdmin = isAdmin;
  }
}
