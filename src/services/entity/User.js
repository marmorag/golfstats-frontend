import decode from 'jwt-decode';

export default class User {
  constructor({ id, username, email }) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static fromToken(token) {
    if (token) {
      const userData = decode(token);

      return new User(userData);
    }

    return null;
  }
}