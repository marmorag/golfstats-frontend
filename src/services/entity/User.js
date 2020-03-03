import decode from 'jwt-decode';

export default class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.roles = user.roles;
  }

  static fromToken(token) {
    if (token) {
      const userData = decode(token);
      return new User(userData.user);
    }

    return null;
  }
}