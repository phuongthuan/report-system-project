import { call, put, takeLatest } from 'redux-saga/effects'

import {
  AUTH_REQUEST
} from './constants'

import {
  loginSucceeded,
  loginFailed
} from './actions'

import { callLogin } from '../../requests'

export function* login(action) {

  const options = {
    email: action.payload.email,
    password: action.payload.password
  };

  try {
    const responseUser = yield call(callLogin, options);
    const { access_token, user } = responseUser;
    localStorage.setItem('token', access_token);
    localStorage.setItem('user', JSON.stringify(user));
    yield put(loginSucceeded(user));
  } catch (error) {
    yield put(loginFailed(error));
    localStorage.removeItem('token');
  }
}

export function* watchLogin() {
  yield takeLatest(AUTH_REQUEST, login);
}

export default function* authPageSaga() {
  yield call(watchLogin);
}


