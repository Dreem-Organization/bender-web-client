import { FETCH_LOGIN, FETCH_JOIN } from 'containers/App/constants';
import { TOGGLE_FORM } from './constants';

export function login(payload) {
  return {
    type: FETCH_LOGIN,
    payload,
  };
}

export function join(payload) {
  return {
    type: FETCH_JOIN,
    payload,
  };
}

export function toggleForm() {
  return {
    type: TOGGLE_FORM,
    payload: null,
  };
}
