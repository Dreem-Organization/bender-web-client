import { FETCH_VALIDATE } from './constants';

export function validate(key, callBack) {
  return {
    type: FETCH_VALIDATE,
    payload: { key, callBack },
  };
}
