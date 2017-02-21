import { BASE_URL } from '../constants/globals'

export function fetchPublicExperiments (token, handler) {
  fetch(`${BASE_URL}/experiments/public_experiments/`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }
  })
  .then((res) => res.json())
  .then((json) => {
    handler(json)
  })
}

export function fetchUserExperiments (token, author, handler) {
  fetch(`${BASE_URL}/experiments/user_experiments/?author=${author}`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }
  })
  .then((res) => res.json())
  .then((json) => {
    handler(json)
  })
}

export function fetchExperiment (token, experimentID, handler) {
  fetch(`${BASE_URL}/experiments/${experimentID}/`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }
  })
  .then((res) => res.json())
  .then((json) => {
    handler(json)
  })
}

export function fetchTrials (token, experimentID, urlFilters, handler) {
  let url = `${BASE_URL}/experiments/${experimentID}/trials/`
  if (urlFilters != null) {
    url += urlFilters
  }
  fetch(url, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }
  })
  .then((res) => res.json())
  .then((json) => {
    handler(json)
  })
}

export function fetchAlgos (token, experimentID, handler) {
  fetch(`${BASE_URL}/experiments/${experimentID}/algos/`, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': token
    }})
  .then((res) => res.json())
  .then((json) => {
    handler(json)
  })
}

export function deleteTrial (token, trialId) {
  fetch(`${BASE_URL}/trials/${trialId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  })
}

export function deleteExperiment (token, experimentID) {
  fetch(`${BASE_URL}/experiments/${experimentID}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  })
}

export function deleteAlgo (token, algoID, handler) {
  fetch(`${BASE_URL}/algos/${algoID}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  }).then((res) => {
    handler(res)
  })
}

export function createExperiment (token, experimentData, handler) {
  fetch(`${BASE_URL}/experiments.json`, {
    method: 'POST',
    body: JSON.stringify(experimentData),
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
    .then((json) => {
      handler(json)
  })
}

export function createAlgo (token, algoData, handler) {
  fetch(`${BASE_URL}/algos.json`, {
    method: 'POST',
    body: JSON.stringify(algoData),
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
    .then((json) => {
      handler(json)
  })
}
