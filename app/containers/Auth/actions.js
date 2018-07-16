import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED, AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCEEDED, AUTH_LOGOUT_FAILED
} from './constants'
import {
  UPDATE_USER_PROFILE, UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCEEDED
} from "../ProfilePage/constants";

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

/*===========================================
 UPDATE PROFILE
 ===========================================*/
export const updateProfile = (profileUpdated) => ({
  type: UPDATE_USER_PROFILE,
  profileUpdated
});

export const updateProfileSucceeded = (profileUpdatedReceived) => ({
  type: UPDATE_USER_PROFILE_SUCCEEDED,
  profileUpdatedReceived
});

export const updateProfileFailed = (error) => ({
  type: UPDATE_USER_PROFILE_FAILED,
  error
});
