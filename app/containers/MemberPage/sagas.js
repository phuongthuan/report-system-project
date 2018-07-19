import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { callGetMembersOfTeam, callGetProfile } from "../../requests";
import {
  fetchAllMembersOfTeamFailed, fetchAllMembersOfTeamSucceeded, getMemberProfileFailed,
  getMemberProfileSucceeded
} from "./actions";
import { FETCH_ALL_MEMBERS_OF_TEAM, GET_MEMBER_PROFILE } from "./constants";

export function* fetchAllMembersOfTeam(action) {
  try {
    const members = yield call(callGetMembersOfTeam, action.team);
    yield delay(700);
    yield put(fetchAllMembersOfTeamSucceeded(members));
  } catch (error) {
    yield put(fetchAllMembersOfTeamFailed(error.message));
  }
}

export function* getMemberProfile(action) {
  try {
    const member = yield call(callGetProfile, action.memberId);
    yield delay(700);
    yield put(getMemberProfileSucceeded(member));
  } catch (error) {
    yield put(getMemberProfileFailed(error.message));
  }
}

export function* watchFetchAllMembersOfTeam() {
  yield takeLatest(FETCH_ALL_MEMBERS_OF_TEAM, fetchAllMembersOfTeam);
}

export function* watchGetMemberProfile() {
  yield takeLatest(GET_MEMBER_PROFILE, getMemberProfile);
}

export function* memberSagaPage() {
  yield [
    fork(watchFetchAllMembersOfTeam),
    fork(watchGetMemberProfile)
  ]
}