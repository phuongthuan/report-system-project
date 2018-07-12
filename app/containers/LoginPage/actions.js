import {
  LOGIN_REQUEST,
  LOGIN_SUCCEEDED,
  LOGIN_FAILED
} from './constants'

export function login(payload) {
  return {
    type: LOGIN_REQUEST,
    payload
  }
}

export function loginSucceeded(userResponse) {
  return {
    type: LOGIN_SUCCEEDED,
    userResponse
  }
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}
