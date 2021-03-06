import { post, get, remove, put } from 'utils/request';
import { BASE_URL, API_BASE_URL } from 'utils/globals';

export const api = {
  login({ username, password }) {
    return post(`${BASE_URL}/login/`, {
      username,
      password,
    });
  },
  deleteAccount({ jwt, id }) {
    return remove(`${API_BASE_URL}/users/${id}/`, jwt);
  },
  socialLogin(code) {
    return post(`${BASE_URL}/github/`, {
      code,
    });
  },
  join({ username, password1, password2, email }, callBack) {
    return post(`${BASE_URL}/registration/`, {
      username,
      password1,
      password2,
      email,
      tos_accepted: true,
    }).then(callBack);
  },
  reset({ email }, callBack) {
    return post(`${BASE_URL}/password/reset/`, {
      email,
    }).then(callBack);
  },
  resetConfirm({ uid, token, password1, password2, callBack }) {
    return post(`${BASE_URL}/password/reset/confirm/`, {
      new_password1: password1,
      new_password2: password2,
      uid,
      token,
    }).then(callBack);
  },
  validate({ key, callBack }) {
    return post(`${BASE_URL}/registration/verify-email/`, {
      key,
    }).then(callBack);
  },
  getExperiments({ jwt, owner, callBack }) {
    return get(`${API_BASE_URL}/experiments/?owner=${owner}`, jwt).then(
      callBack,
    );
  },
  deleteExperiment({ jwt, experiment, callBack }) {
    return remove(`${API_BASE_URL}/experiments/${experiment}/`, jwt).then(
      callBack,
    );
  },
  createExperiment({ jwt, experimentData, callBack }) {
    return post(`${API_BASE_URL}/experiments.json`, experimentData, jwt).then(
      callBack,
    );
  },
  getAlgos({ jwt, experiment, callBack }) {
    return get(`${API_BASE_URL}/algos/?experiment=${experiment}`, jwt).then(
      callBack,
    );
  },
  deleteAlgo({ jwt, algo, callBack }) {
    return remove(`${API_BASE_URL}/algos/${algo}/`, jwt).then(callBack);
  },
  createAlgo({ jwt, algoData, callBack }) {
    return post(`${API_BASE_URL}/algos.json`, algoData, jwt).then(callBack);
  },
  updateAlgo({ jwt, algoData, callBack, algoId }) {
    return put(`${API_BASE_URL}/algos/${algoId}/`, algoData, jwt).then(
      callBack,
    );
  },
  getTrials({ jwt, experiment, filters, callBack }) {
    return get(
      `${API_BASE_URL}/trials/?experiment=${experiment}&o_results=${
        filters.order
      }&limit=10000`,
      jwt,
    ).then(callBack);
  },
  contact({ jwt, data }) {
    return post(`${API_BASE_URL}/users/contact/`, data, jwt);
  },
};
