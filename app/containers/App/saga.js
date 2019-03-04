import { call, take, put, all, fork } from 'redux-saga/effects';
import {
  FETCH_ERROR,
  FETCH_LOGIN,
  LOGIN,
  LOGOUT_REQUEST,
  LOGOUT,
  DELETE_ACCOUNT_REQUEST,
  FETCH_RESET,
  RESET,
  SOCIAL_LOGIN,
  FETCH_JOIN,
  JOIN,
} from 'containers/App/constants';
import { TOGGLE_MODAL, CONFIRM_CHOICE } from 'containers/Dashboard/constants';
import { PUT_TOAST } from 'containers/Toaster/constants';
import { api } from 'utils/api';
// import { selectCredentials } from 'containers/App/selectors';

export function getCart(state) {
  return state;
}

function* login(action) {
  try {
    const data = yield call(api.login, action.payload);
    yield put({ type: LOGIN, payload: data });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
    yield put({
      type: PUT_TOAST,
      payload: {
        message: error.message,
        life: 10,
      },
    });
  }
}

function* resetPassword(action) {
  try {
    const data = yield call(api.reset, action.payload, action.payload.callback);
    yield put({ type: RESET, payload: data });
    yield put({
      type: PUT_TOAST,
      payload: {
        message: 'Email successfully sent.',
        life: 10,
      },
    });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
    yield put({
      type: PUT_TOAST,
      payload: {
        message: error.message,
        life: 10,
      },
    });
  }
}

function* socialLogin(data) {
  try {
    const response = yield call(api.socialLogin, data.payload);
    yield put({ type: LOGIN, payload: response });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
  }
}

function* join(action) {
  try {
    const data = yield call(api.join, action.payload, () =>
      action.payload.history.push('/verify/mail'),
    );
    yield put({ type: JOIN, payload: data });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
    yield put({
      type: PUT_TOAST,
      payload: {
        message: error.message,
        life: 10,
      },
    });
  }
}

function* deleteAccount(action) {
  try {
    yield call(api.deleteAccount, action.payload);
    yield put({ type: LOGOUT, payload: '' });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
    yield put({
      type: PUT_TOAST,
      payload: {
        message: error.message,
        life: 10,
      },
    });
  }
}

// ############################################################################
// ############################################################################
// ---------------------------  WATCHERS --------------------------------------
// ############################################################################
// ############################################################################

function* loginWatcher() {
  while (true) {
    const data = yield take(FETCH_LOGIN);
    yield call(login, data);
  }
}

function* logoutWatcher() {
  while (true) {
    yield take(LOGOUT_REQUEST);
    yield put({ type: TOGGLE_MODAL, payload: 'confirm' });
    const choice = yield take(CONFIRM_CHOICE);
    if (choice.payload === true) {
      yield put({ type: LOGOUT, payload: '' });
    }
    yield put({ type: TOGGLE_MODAL, payload: '' });
  }
}

function* deleteAccountWatcher() {
  while (true) {
    const data = yield take(DELETE_ACCOUNT_REQUEST);
    yield call(deleteAccount, data);
  }
}

function* resetWatcher() {
  while (true) {
    const data = yield take(FETCH_RESET);
    yield call(resetPassword, data);
  }
}

function* socialLoginWatcher() {
  while (true) {
    const data = yield take(SOCIAL_LOGIN);
    yield call(socialLogin, data);
  }
}

function* joinWatcher() {
  while (true) {
    const data = yield take(FETCH_JOIN);
    yield call(join, data);
  }
}

export default function* rootSaga() {
  yield all([
    fork(logoutWatcher),
    fork(deleteAccountWatcher),
    fork(loginWatcher),
    fork(resetWatcher),
    fork(socialLoginWatcher),
    fork(joinWatcher),
  ]);
}
