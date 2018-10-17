import { call, take, put } from 'redux-saga/effects';
import { api } from 'utils/api';
import { FETCH_ERROR } from 'containers/App/constants';
import { FETCH_VALIDATE, VALIDATE } from './constants';

function* validate(action) {
  console.log(action);
  try {
    const data = yield call(api.validate, action.payload);
    yield put({ type: VALIDATE, payload: data });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
  }
}

// ############################################################################
// ############################################################################
// ---------------------------  WATCHERS --------------------------------------
// ############################################################################
// ############################################################################

export default function* rootSaga() {
  while (true) {
    const data = yield take(FETCH_VALIDATE);
    yield call(validate, data);
  }
}
