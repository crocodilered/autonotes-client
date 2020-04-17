import { AUTH_KEY, AUTH_HAS_USER } from './config'

export const getToken = () => {
  return window.localStorage.getItem(AUTH_KEY)
}

export const hasUser = () => {
  return window.localStorage.getItem(AUTH_HAS_USER) === 1
}

export const setToken = token => {
  window.localStorage.setItem(AUTH_KEY, token)
  window.localStorage.setItem(AUTH_HAS_USER, 1)
}

export const purgeToken = () => {
  window.localStorage.removeItem(AUTH_KEY)
}

export default { 
  getToken, 
  setToken, 
  purgeToken 
}
