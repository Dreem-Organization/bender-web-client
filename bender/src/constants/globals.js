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
