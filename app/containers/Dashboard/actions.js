import {
  LOGOUT_REQUEST,
  DELETE_ACCOUNT_REQUEST,
} from 'containers/App/constants';
import {
  LOAD_FRESH_CONTENT,
  TOGGLE_MENU,
  STAGE_UPDATE,
  FETCH_EXPERIMENTS,
  FETCH_DELETE_EXPERIMENT,
  FETCH_CREATE_EXPERIMENT,
  FETCH_ALGOS,
  FETCH_CREATE_ALGO,
  FETCH_UPDATE_ALGO,
  FETCH_DELETE_ALGO,
  CHANGE_FILTERS,
  CHANGE_SELECTED_HYPER_PARAMETER,
  FETCH_TRIALS,
  TOGGLE_MODAL,
  CHANGE_RANK_BY,
  CHART_POINT_SELECT,
  REMOVE_SELECTED_METRIC,
  ADD_SELECTED_METRIC,
  CONFIRM_CHOICE,
  CONTACT,
} from './constants';

// EXTERNAL STORE CALLS -------------------------------------------------------
export function logout() {
  return {
    type: LOGOUT_REQUEST,
    payload: null,
  };
}

export function deleteAccount(jwt, id) {
  return {
    type: DELETE_ACCOUNT_REQUEST,
    payload: { jwt, id },
  };
}
// ########### ----------------------------------------------------------------

// ALGOS ----------------------------------------------------------------------
// API CALLS ***
export function fetchAlgos(jwt, experiment) {
  return {
    type: FETCH_ALGOS,
    payload: { jwt, experiment },
  };
}

export function createAlgo(jwt, raw, experiment, user) {
  const algoData = {
    experiment,
    name: raw.name,
    description: raw.description,
    parameters: raw.parameters,
  };
  algoData.parameters.forEach((e, i) => {
    Object.keys(algoData.parameters[i].search_space).forEach(key => {
      if (
        (Array.isArray(algoData.parameters[i].search_space[key]) &&
          algoData.parameters[i].search_space[key].length === 0) ||
        !algoData.parameters[i].search_space[key]
      ) {
        delete algoData.parameters[i].search_space[key];
      }
    });
  });
  return {
    type: FETCH_CREATE_ALGO,
    payload: { jwt, algoData, experiment, user },
  };
}

export function updateAlgo(jwt, raw, experiment, user) {
  const algoData = {
    experiment,
    name: raw.name,
    parameters: raw.parameters,
  };
  algoData.parameters.forEach((e, i) => {
    Object.keys(algoData.parameters[i].search_space).forEach(key => {
      if (
        (Array.isArray(algoData.parameters[i].search_space[key]) &&
          algoData.parameters[i].search_space[key].length === 0) ||
        !algoData.parameters[i].search_space[key]
      ) {
        delete algoData.parameters[i].search_space[key];
      }
    });
  });
  return {
    type: FETCH_UPDATE_ALGO,
    payload: { jwt, algoData, experiment, user, algoId: raw.id },
  };
}

export function deleteAlgo(jwt, algo, experiment) {
  return {
    type: FETCH_DELETE_ALGO,
    payload: { jwt, algo, experiment },
  };
}
// ########### ----------------------------------------------------------------

// TRIALS ---------------------------------------------------------------------
// API CALLS ***
export function fetchTrials(jwt, experiment, filters, algo) {
  return {
    type: FETCH_TRIALS,
    payload: { jwt, experiment, algo, filters },
  };
}
// ########### ----------------------------------------------------------------

// EXPERIMENTS ----------------------------------------------------------------
// API CALLS ***

export function loadFreshContent() {
  return {
    type: LOAD_FRESH_CONTENT,
    payload: null,
  };
}

export function fetchExperiments(jwt, owner) {
  return {
    type: FETCH_EXPERIMENTS,
    payload: { jwt, owner },
  };
}

export function createExperiment(jwt, data, owner) {
  const experimentData = { ...data, owner };
  return {
    type: FETCH_CREATE_EXPERIMENT,
    payload: { jwt, experimentData },
  };
}

export function deleteExperiment(jwt, experiment) {
  return {
    type: FETCH_DELETE_EXPERIMENT,
    payload: { jwt, experiment },
  };
}

// ########### ----------------------------------------------------------------

// OTHERS ---------------------------------------------------------------------
export function filterChange(data) {
  return {
    type: CHANGE_FILTERS,
    payload: data,
  };
}

export function selectedHyperParameterChange(experiment, metric) {
  return {
    type: CHANGE_SELECTED_HYPER_PARAMETER,
    payload: { experiment, metric },
  };
}

export function changeSelectedMetrics(data) {
  if (data.action === 'add') {
    return {
      type: ADD_SELECTED_METRIC,
      payload: data.metric,
      meta: data.experiment,
    };
  }
  return {
    type: REMOVE_SELECTED_METRIC,
    payload: data.metric,
    meta: data.experiment,
  };
}

export function chartPointSelect(point) {
  return {
    type: CHART_POINT_SELECT,
    payload: point,
  };
}

export function changeRankBy(metric, id) {
  return {
    type: CHANGE_RANK_BY,
    payload: metric,
    meta: id,
  };
}

export function toggleMenu() {
  return {
    type: TOGGLE_MENU,
    payload: null,
  };
}

export function stageUpdate(newStage) {
  return {
    type: STAGE_UPDATE,
    payload: newStage,
  };
}

export function toggleModal(modal, meta) {
  return {
    type: TOGGLE_MODAL,
    payload: modal,
    meta,
  };
}

export function contact(jwt, data) {
  return {
    type: CONTACT,
    payload: { jwt, data },
  };
}

export function confirmChoice(status) {
  return {
    type: CONFIRM_CHOICE,
    payload: status,
  };
}
