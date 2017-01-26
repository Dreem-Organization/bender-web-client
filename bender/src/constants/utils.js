import _ from 'lodash'
import { storageKey } from '../constants/globals'

export function checkTokenValidity (token) {
  if (!token) {
    return false
  }
  const tokenParts = _.split(token, '.')
  if (tokenParts.length !== 3) {
    return false
  }
  if (process.env.NODE_ENV === 'production') {
    try {
      const userInfo = JSON.parse(window.atob(tokenParts[1]))
      if (userInfo.exp != null) {
        const expiration = +userInfo.exp
        if (_.isNaN(expiration)) {
          return false
        }
        if (expiration * 1000 - Date.now() < 3600000) {
          return false
        }
      }
    } catch (e) {
      return false
    }
  }
  return true
}

export function requireAuth (nextState, replace, handler) {
  const id = window.localStorage.getItem(storageKey.user)
  const username = window.localStorage.getItem(storageKey.username)
  const token = window.localStorage.getItem(storageKey.token)
  if (!id || !checkTokenValidity(token)) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  } else {
    handler({ id, username, token })
  }
}
