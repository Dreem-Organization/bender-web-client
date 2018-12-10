import { call, take, put } from 'redux-saga/effects';
import { api } from 'utils/api';
import { FETCH_ERROR } from 'containers/App/constants';
import { PUT_TOAST } from 'containers/Toaster/constants';
import { FETCH_RESET } from './constants';

function* reset(action) {
  try {
    yield call(api.resetConfirm, action.payload);
    yield put({
      type: PUT_TOAST,
      payload: {
        message: 'New password set !',
        life: 10,
      },
    });
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
    const data = yield take(FETCH_RESET);
    yield call(reset, data);
  }
}
