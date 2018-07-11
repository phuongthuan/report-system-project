import {
  LOGIN_REQUEST,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED
} from './constants'

export function login(email, password) {
  return {
    type: LOGIN_REQUEST,
    payload: { email, password }
  }
}

export function loginSucceeded(payload) {
  return {
    type: LOGIN_SUCCEEDED,
    payload
  }
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}
