import { LOAD_LOCAL_STORAGE, SET_CURRENT_USER, SET_USER_NAME } from './constants'

export function setUsername(username) {
  return {
    type: SET_USER_NAME,
    username,
  }
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  }
}

export function loadStateFromLocalStorage(auth) {
  return {
    type: LOAD_LOCAL_STORAGE,
    auth
  }
}