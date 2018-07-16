import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED, AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCEEDED, AUTH_LOGOUT_FAILED
} from './constants'

export function login(payload) {
  return {
    type: AUTH_LOGIN_REQUEST,
    payload
  }
}

export function loginSucceeded(userResponse) {
  return {
    type: AUTH_LOGIN_SUCCEEDED,
    userResponse
  }
}

export function loginFailed(error) {
  return {
    type: AUTH_LOGIN_FAILED,
    error
  }
}

export function logout() {
  return {
    type: AUTH_LOGOUT_REQUEST
  }
}

export function logoutSucceeded(userResponse) {
  return {
    type: AUTH_LOGOUT_SUCCEEDED,
    userResponse
  }
}

export function logoutFailed(error) {
  return {
    type: AUTH_LOGOUT_FAILED,
    error
  }
}
