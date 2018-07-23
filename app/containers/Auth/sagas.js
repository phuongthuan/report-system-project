import { take, call, put, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  AUTH_LOGIN_REQUEST, AUTH_LOGOUT_REQUEST
} from './constants'

import {
  loginSucceeded,
  loginFailed, logoutSucceeded, logoutFailed
} from './actions'

import { callLogin, callLogout } from '../../requests'

export function* loginFlow(action) {

  const options = {
    email: action.payload.email,
    password: action.payload.password
  };

  try {
    yield delay(300);
    const responseUser = yield call(callLogin, options);
    const { user } = responseUser;
    localStorage.setItem('auth', JSON.stringify(responseUser));
    yield put(loginSucceeded(user));
  } catch (error) {
    yield put(loginFailed(error.message));
  }
}

export function* logoutFlow() {
  try {
    yield callLogout(callLogout);
    yield put(logoutSucceeded({}));
  } catch (error) {
    yield put(logoutFailed(error.message));
  }
}

export function* watchLogin() {
  yield takeLatest(AUTH_LOGIN_REQUEST, loginFlow);
}

export function* watchLogout() {
  yield takeLatest(AUTH_LOGOUT_REQUEST, logoutFlow);
}

export default function* authPageSaga() {
  yield fork(watchLogin);
  yield fork(watchLogout);
}
