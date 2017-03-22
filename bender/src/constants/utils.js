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
  try {
    const userInfo = JSON.parse(window.atob(tokenParts[1]))
    if (userInfo.exp != null) {
      const expiration = +userInfo.exp
      if (_.isNaN(expiration)) {
        return false
      }
      if (expiration * 1000 - Date.now() < 1800000) {
        return false
      }
    }
  } catch (e) {
    return false
  }
  return true
}

export function getUserData () {
  return JSON.parse(window.localStorage.getItem(storageKey.user))
}
