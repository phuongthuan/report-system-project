import {
  AUTH_REQUEST,
  AUTH_SUCCEEDED,
  AUTH_FAILED
} from './constants'

export function login(payload) {
  return {
    type: AUTH_REQUEST,
    payload
  }
}

export function loginSucceeded(userResponse) {
  return {
    type: AUTH_SUCCEEDED,
    userResponse
  }
}

export function loginFailed(error) {
  return {
    type: AUTH_FAILED,
    error
  }
}
