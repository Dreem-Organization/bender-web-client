import {API_BASE_URL, BASE_URL} from '../constants/globals'

export function fetchSharedWithExperiments(token, owner, handler) {
    fetch(`${API_BASE_URL}/experiments/?shared_with=${owner}`, {
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

export function fetchUserExperiments(token, owner, handler) {
    fetch(`${API_BASE_URL}/experiments/?owner=${owner}`, {
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

export function fetchExperiment(token, owner, experimentID, handler) {
    fetch(`${API_BASE_URL}/experiments/${experimentID}/`, {
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

export function fetchTrials(token, experimentID, urlFilters, handler) {
    let url = `${API_BASE_URL}/trials/?experiment=${experimentID}`
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

export function fetchAlgos(token, experimentID, handler) {
    fetch(`${API_BASE_URL}/algos/?experiment=${experimentID}`, {
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

export function deleteTrial(token, trialId) {
    fetch(`${API_BASE_URL}/trials/${trialId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
}

export function deleteExperiment(token, experimentID) {
    fetch(`${API_BASE_URL}/experiments/${experimentID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
}

export function deleteAlgo(token, algoID, handler) {
    fetch(`${API_BASE_URL}/algos/${algoID}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    }).then((res) => {
        handler(res)
    })
}

export function createExperiment(token, experimentData, handler) {
    fetch(`${API_BASE_URL}/experiments.json`, {
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

export function createAlgo(token, algoData, handler) {
    console.log(algoData);
    console.log(JSON.stringify(algoData));
    fetch(`${API_BASE_URL}/algos.json`, {
        method: 'POST',
        body: JSON.stringify(algoData),
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    })
        .catch(function (err) {
            console.log(err.json());
        })
        .then((res) => res.json())
        .then((json) => {
            handler(json)
        })
}


export function fetchUsernames(token, q, handler) {
    fetch(`${API_BASE_URL}/users/?search=${q}`, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then((json) => {
            handler(json)
        })
}


export function verifyEmail(key, handler) {
    fetch(`${BASE_URL}/registration/verify-email/`, {
        method: 'POST',
        body: JSON.stringify({key}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        console.log(typeof(response));
        console.log(typeof(response.json()));
    })
        .then((res) => res.json())
        .then((json) => {
            handler(json)
        })
}

export function loginRequest(credentials, respHandler, handler) {
    fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
        })
    }).then((resp) => {
        return respHandler(resp)
    }).then((json) => handler(json))
}