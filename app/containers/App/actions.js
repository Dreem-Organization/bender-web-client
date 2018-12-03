import {
  ANIMATOR_UPDATE,
  LOGIN,
  LOGOUT,
  FIRST_VIEW_LOADED,
  SOCIAL_LOGIN,
  TOGGLE_THEME,
} from './constants';

export function animatorUpdate(data) {
  return {
    type: ANIMATOR_UPDATE,
    payload: data,
  };
}

export function verifyUser(data) {
  if (data) {
    return {
      type: LOGIN,
      payload: { token: data.jwt, user: data.user },
    };
  }
  return {
    type: LOGOUT,
    payload: null,
  };
}

export function firstViewLoaded() {
  return {
    type: FIRST_VIEW_LOADED,
    payload: null,
  };
}

export function socialLogin(code) {
  return {
    type: SOCIAL_LOGIN,
    payload: code,
  };
}

export function toggleTheme(theme) {
  return {
    type: TOGGLE_THEME,
    payload: theme,
  };
}
