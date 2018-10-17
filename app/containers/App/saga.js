import { call, take, put, all, fork } from 'redux-saga/effects';
import {
  FETCH_ERROR,
  FETCH_LOGIN,
  LOGIN,
  SOCIAL_LOGIN,
  FETCH_JOIN,
  JOIN,
} from 'containers/App/constants';
import { api } from 'utils/api';
// import { selectCredentials } from 'containers/App/selectors';

export function getCart(state) {
  return state;
}

function* login(action) {
  try {
    // TODO: Finding a way to use selectors to search in form store (AKA : makeSelectForm)
    // const credentials = yield select(selectCredentials);
    const data = yield call(api.login, action.payload);
    yield put({ type: LOGIN, payload: data });
  } catch (error) {
    yield put({ type: FETCH_ERROR, payload: error });
  }
}

function* socialLogin(data) {
  console.log(data.payload.code);
  try {
    const response = yield call(api.socialLogin, data.payload.code);
    console.log(response);
    // yield put({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error);
    // yield put({ type: FETCH_ERROR, payload: error });
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
  yield all([fork(loginWatcher), fork(socialLoginWatcher), fork(joinWatcher)]);
}
