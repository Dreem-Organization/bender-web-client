import { FETCH_RESET } from './constants';

export function reset(uid, token, password1, password2, callBack) {
  return {
    type: FETCH_RESET,
    payload: { uid, token, password1, password2, callBack },
  };
}
