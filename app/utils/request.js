import axios from 'axios';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.data;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function get(url, token) {
  axios.defaults.headers.common.Authorization = `JWT ${token}`;
  return axios
    .get(url)
    .then(checkStatus)
    .then(parseJSON);
}

export function post(url, data, token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  }
  return axios
    .post(url, data)
    .then(checkStatus)
    .then(parseJSON);
}

export function remove(url, token) {
  axios.defaults.headers.common.Authorization = `JWT ${token}`;
  return axios
    .delete(url)
    .then(checkStatus)
    .then(parseJSON);
}
