import axios from 'axios';

export function get(url, token) {
  axios.defaults.headers.common.Authorization = `JWT ${token}`;
  return axios
    .get(url)
    .then(res => res.data)
    .catch(err => {
      const msg = JSON.stringify(err.response.data).split('"');
      throw {
        type: 'warning',
        status: err.response.status,
        message: msg[msg.length - 2],
      };
    });
}

export function post(url, data, token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  }
  return axios
    .post(url, data)
    .then(res => res.data)
    .catch(err => {
      const msg = JSON.stringify(err.response.data).split('"');
      throw {
        type: 'warning',
        status: err.response.status,
        message: msg[msg.length - 2],
      };
    });
}

export function put(url, data, token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
  }
  return axios
    .put(url, data)
    .then(res => res.data)
    .catch(err => {
      const msg = JSON.stringify(err.response.data).split('"');
      throw {
        type: 'warning',
        status: err.response.status,
        message: msg[msg.length - 2],
      };
    });
}

export function remove(url, token) {
  axios.defaults.headers.common.Authorization = `JWT ${token}`;
  return axios
    .delete(url)
    .then(res => res.data)
    .catch(err => {
      const msg = JSON.stringify(err.response.data).split('"');
      throw {
        type: 'warning',
        status: err.response.status,
        message: msg[msg.length - 2],
      };
    });
}
