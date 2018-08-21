import { call, put, takeLatest, fork, all } from 'redux-saga/effects'
import { delay } from 'redux-saga';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGOUT_REQUEST
} from './constants'
import {
  loginSucceeded,
  loginFailed,
  logoutSucceeded,
  logoutFailed
} from './actions'
import { callLogin, callLogout } from '../../requests';
import history from '../../utils/history'

export function* loginFlow(action) {

  const options = {
    email: action.payload.email,
    password: action.payload.password
  };

  try {
    const auth = yield call(callLogin, options);
    yield delay(300);
    const {user} = auth;
    localStorage.setItem('auth', JSON.stringify(auth));
    yield put(loginSucceeded(user));
    history.push('/profile/edit');
  } catch (error) {
    yield put(loginFailed(error.response.data));
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
  yield all([
    fork(watchLogin),
    fork(watchLogout)
  ]);
}
