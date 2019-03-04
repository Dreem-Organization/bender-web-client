import { light } from 'themeConfig';

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

  static setStage(stage) {
    localStorage.setItem('dreem-bender-stage', JSON.stringify({ stage }));
  }

  static removeStage() {
    localStorage.removeItem('dreem-bender-stage');
  }

  static getStage() {
    return JSON.parse(localStorage.getItem('dreem-bender-stage'));
  }

  static setTheme(theme) {
    localStorage.setItem('dreem-bender-theme', JSON.stringify(theme));
  }

  static getTheme() {
    let ret = JSON.parse(localStorage.getItem('dreem-bender-theme'));
    if (!ret) {
      ret = light;
    }
    return ret;
  }

  static setCookieUsage() {
    localStorage.setItem('cookies-usage', 'true');
  }

  static getCookieUsage() {
    return JSON.parse(localStorage.getItem('cookies-usage')) !== null;
  }
}
