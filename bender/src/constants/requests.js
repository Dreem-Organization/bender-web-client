import { BASE_URL } from '../constants/globals'

export function fetchExperiments (token, handler) {
  fetch(`${BASE_URL}/experiments/`, {
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
    url = url + urlFilters
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
