import { call, take, put, all, fork } from 'redux-saga/effects';
import { api } from 'utils/api';
import { PUT_TOAST } from 'containers/Toaster/constants';
import {
  FETCH_EXPERIMENTS,
  FEED_EXPERIMENTS,
  FETCH_DELETE_EXPERIMENT,
  FETCH_CREATE_EXPERIMENT,
  DELETE_EXPERIMENT,
  CREATE_EXPERIMENT,
  FETCH_TRIALS,
  FETCH_ALGOS,
  FETCH_DELETE_ALGO,
  FETCH_CREATE_ALGO,
  FETCH_UPDATE_ALGO,
  DELETE_ALGO,
  CREATE_ALGO,
  UPDATE_ALGO,
  FEED_ALGOS,
  FEED_TRIALS,
  SET_IS_FETCHING,
  FETCH_ERROR,
} from './constants';

function* fetchExperiments(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const data = yield call(api.getExperiments, action.payload);
    const experiments = {};
    data.results.forEach(e => {
      experiments[e.id] = {
        ...e,
        algos: {
          loaded: false,
          list: {},
        },
        trials: {
          loaded: false,
          list: {},
        },
        rankBy: e.metrics[0],
        selectedHyperParameter: 'time',
        hyperParametersAvailables: [],
        selectedMetrics: [e.metrics[0]],
      };
    });
    yield put({ type: FEED_EXPERIMENTS, payload: experiments });
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

function* fetchDeleteExperiment(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    yield call(api.deleteExperiment, action.payload);
    yield put({ type: DELETE_EXPERIMENT, payload: action.payload.experiment });
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

function* fetchCreateExperiment(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const data = yield call(api.createExperiment, action.payload);
    yield put({
      type: CREATE_EXPERIMENT,
      payload: data,
      meta: action.payload.experimentData.owner,
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

function* fetchAlgos(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const data = yield call(api.getAlgos, action.payload);
    const algos = {};
    data.results.forEach(a => {
      algos[a.id] = a;
    });
    const update = {};
    update[action.payload.experiment] = {
      algos: {
        loaded: true,
        list: algos,
      },
    };
    yield put({
      type: FEED_ALGOS,
      payload: update,
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

function* fetchDeleteAlgo(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    yield call(api.deleteAlgo, action.payload);
    yield put({
      type: DELETE_ALGO,
      payload: action.payload.algo,
      meta: action.payload.experiment,
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

function* fetchCreateAlgo(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const data = yield call(api.createAlgo, action.payload);
    yield put({ type: CREATE_ALGO, payload: data, meta: action.payload.user });
  } catch (error) {
    yield put({
      type: PUT_TOAST,
      payload: {
        message: error.message,
        life: 10,
      },
    });
  }
}

function* fetchUpdateAlgo(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const data = yield call(api.updateAlgo, action.payload);
    yield put({ type: UPDATE_ALGO, payload: data, meta: action.payload.user });
  } catch (error) {
    yield put({
      type: PUT_TOAST,
      payload: {
        message: error.message,
        life: 10,
      },
    });
  }
}

function* fetchTrials(action) {
  try {
    yield put({ type: SET_IS_FETCHING, payload: true });
    const trials = yield call(api.getTrials, action.payload);
    const categorized = {};
    const hyperParameters = [];
    trials.results.forEach(trial => {
      if (!categorized[trial.algo]) {
        categorized[trial.algo] = [];
      }
      categorized[trial.algo].push(trial);
      Object.keys(trial.parameters).forEach(param => {
        if (!hyperParameters.includes(param)) {
          hyperParameters.push(param);
        }
      });
    });
    const update = {
      loaded: true,
      list: categorized,
    };
    yield put({
      type: FEED_TRIALS,
      payload: update,
      meta: action.payload.experiment,
      hyperParameters,
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

// ############################################################################
// ############################################################################
// ---------------------------  WATCHERS --------------------------------------
// ############################################################################
// ############################################################################

function* fetchExperimentsWatcher() {
  while (true) {
    const data = yield take(FETCH_EXPERIMENTS);
    yield call(fetchExperiments, data);
  }
}

function* delExperimentWatcher() {
  while (true) {
    const data = yield take(FETCH_DELETE_EXPERIMENT);
    yield call(fetchDeleteExperiment, data);
  }
}

function* createExperimentWatcher() {
  while (true) {
    const data = yield take(FETCH_CREATE_EXPERIMENT);
    yield call(fetchCreateExperiment, data);
  }
}

function* fetchAlgosWatcher() {
  while (true) {
    const data = yield take(FETCH_ALGOS);
    yield call(fetchAlgos, data);
  }
}

function* delAlgoWatcher() {
  while (true) {
    const data = yield take(FETCH_DELETE_ALGO);
    yield call(fetchDeleteAlgo, data);
  }
}

function* createAlgoWatcher() {
  while (true) {
    const data = yield take(FETCH_CREATE_ALGO);
    yield call(fetchCreateAlgo, data);
  }
}

function* updateAlgoWatcher() {
  while (true) {
    const data = yield take(FETCH_UPDATE_ALGO);
    yield call(fetchUpdateAlgo, data);
  }
}

function* fetchTrialsWatcher() {
  while (true) {
    const data = yield take(FETCH_TRIALS);
    yield call(fetchTrials, data);
  }
}

export default function* rootSaga() {
  yield all([
    fork(fetchExperimentsWatcher),
    fork(delExperimentWatcher),
    fork(createExperimentWatcher),
    fork(fetchAlgosWatcher),
    fork(delAlgoWatcher),
    fork(createAlgoWatcher),
    fork(updateAlgoWatcher),
    fork(fetchTrialsWatcher),
  ]);
}
