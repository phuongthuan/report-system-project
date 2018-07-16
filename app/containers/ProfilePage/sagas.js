import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  callGetProfile,
  callUpdateProfile
} from "../../requests";
import {
  getUserProfileFailed,
  getUserProfileSucceeded,
  updateProfileFailed,
  updateProfileSucceeded
} from "./actions";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "./constants";

export function* getProfile(action) {
  try {
    const userProfile = yield call(callGetProfile, action.id);
    yield delay(700);
    yield put(getUserProfileSucceeded(userProfile));
  } catch (error) {
    yield put(getUserProfileFailed(error.message));
  }
}

export function* updateProfile(action) {
  try {
    const newProfile = yield call(callUpdateProfile, action.profileUpdated);
    yield put(updateProfileSucceeded(newProfile));
  } catch (error) {
    yield put(updateProfileFailed(error.message));
  }
}

export function* watchGetProfile() {
  yield takeLatest(GET_USER_PROFILE, getProfile);
}

export function* watchUpdateProfile() {
  yield takeLatest(UPDATE_USER_PROFILE, updateProfile);
}

export default function* profilePageSaga() {
  yield [
    fork(watchGetProfile),
    fork(watchUpdateProfile)
  ]
}