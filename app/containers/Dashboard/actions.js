import { LOGOUT } from 'containers/App/constants';
import {
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
  CHART_POINT_SELECT,
  REMOVE_SELECTED_METRIC,
  ADD_SELECTED_METRIC,
} from './constants';

// EXTERNAL STORE CALLS -------------------------------------------------------
export function logout() {
  return {
    type: LOGOUT,
    payload: null,
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
    parameters: [],
  };
  raw.parameters.forEach(p => {
    if (p.type === 'categorical') {
      algoData.parameters.push({
        category: p.type,
        name: p.hpName,
        search_space: {
          values: p.select,
        },
      });
    } else {
      algoData.parameters.push({
        category: p.type,
        name: p.hpName,
        search_space: {
          step: parseFloat(p.step),
          low: parseFloat(p.low),
          high: parseFloat(p.high),
        },
      });
    }
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
    parameters: [],
  };
  raw.parameters.forEach(p => {
    if (p.type === 'categorical') {
      algoData.parameters.push({
        category: p.type,
        name: p.hpName,
        search_space: {
          values: p.select,
        },
      });
    } else {
      algoData.parameters.push({
        category: p.type,
        name: p.hpName,
        search_space: {
          step: parseFloat(p.step),
          low: parseFloat(p.low),
          high: parseFloat(p.high),
        },
      });
    }
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
