export const storageKey = {
  username: 'dreem-viewer-username',
  token: 'dreem-viewer-token',
  user: 'dreem-viewer-user'
}

export const loginURL = (function () {
  switch (process.env.DREEM_API) {
    case 'preprod':
      return 'https://login.staging.rythm.co/token/'
    case 'eu':
    default:
      return 'https://login.rythm.co/token/'
  }
})()

//export const API_BASE_URL = 'https://api.rythm.co/v1/dreem/bender/api/'
export const BASE_URL = 'http://0.0.0.0:8000'
export const API_BASE_URL = 'http://0.0.0.0:8000/api'
// export const signupUrl = `${BASE_URL}registration/`
