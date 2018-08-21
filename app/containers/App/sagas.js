import { call, put, takeLatest, all, fork } from 'redux-saga/effects'

import { callChangeLocale } from "../../requests";
import { setLocaleFailed, setLocaleSucceeded } from "./actions";
import { SET_LOCALE } from "./constants";

export function* setLocale(action) {
  try {
    const newLang = yield call(callChangeLocale, action.lang);
    yield put(setLocaleSucceeded(newLang));
  } catch (error) {
    yield put(setLocaleFailed(error));
  }
}

export function* watchSetLocale() {
  yield takeLatest(SET_LOCALE, setLocale)
}

export default function* appSaga() {
  yield all ([
    fork(watchSetLocale)
  ])
}