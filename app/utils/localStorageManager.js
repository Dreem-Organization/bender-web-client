export default class LocalStorageManager {
  static setUser(jwt, user) {
    localStorage.setItem('dreem-bender-user', JSON.stringify({ jwt, user }));
  }

  static removeUser() {
    localStorage.removeItem('dreem-bender-user');
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('dreem-bender-user'));
  }
}
