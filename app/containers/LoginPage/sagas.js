import { call, put, takeLatest } from 'redux-saga/effects'
import {
  LOGIN_REQUEST
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
    const { access_token } = responseUser;
    yield put(loginSucceeded(responseUser));
    localStorage.setItem('token', access_token);
  } catch (error) {
    yield put(loginFailed(error));
    localStorage.removeItem('token');
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* loginPageSaga() {
  yield call(watchLogin);
}


