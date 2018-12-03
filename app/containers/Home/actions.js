import { FETCH_LOGIN, FETCH_JOIN, FETCH_RESET } from 'containers/App/constants';
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

export function reset(payload) {
  return {
    type: FETCH_RESET,
    payload,
  };
}

export function toggleForm(data) {
  return {
    type: TOGGLE_FORM,
    payload: data,
  };
}
