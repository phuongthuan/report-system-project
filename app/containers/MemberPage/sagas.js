import { call, put, takeLatest, fork, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { callGetMembers, callGetMembersOfTeam, callGetProfile } from "../../requests";
import {
  fetchAllMembersFailed,
  fetchAllMembersOfTeamFailed, fetchAllMembersOfTeamSucceeded, fetchAllMembersSucceeded, getMemberProfileFailed,
  getMemberProfileSucceeded
} from "./actions";
import { FETCH_ALL_MEMBERS, FETCH_ALL_MEMBERS_OF_TEAM, GET_MEMBER_PROFILE } from "./constants";

export function* fetchAllMembersOfTeam(action) {
  try {
    const members = yield call(callGetMembersOfTeam, action.team);
    yield delay(700);
    yield put(fetchAllMembersOfTeamSucceeded(members));
  } catch (error) {
    yield put(fetchAllMembersOfTeamFailed(error));
  }
}

export function* fetchAllMembers() {
  try {
    const members = yield call(callGetMembers);
    yield delay(700);
    yield put(fetchAllMembersSucceeded(members));
  } catch (error) {
    yield put(fetchAllMembersFailed(error));
  }
}

export function* getMemberProfile(action) {
  try {
    const member = yield call(callGetProfile, action.memberId);
    yield delay(700);
    yield put(getMemberProfileSucceeded(member));
  } catch (error) {
    yield put(getMemberProfileFailed(error));
  }
}

export function* watchFetchAllMembers() {
  yield takeLatest(FETCH_ALL_MEMBERS, fetchAllMembers);
}

export function* watchFetchAllMembersOfTeam() {
  yield takeLatest(FETCH_ALL_MEMBERS_OF_TEAM, fetchAllMembersOfTeam);
}

export function* watchGetMemberProfile() {
  yield takeLatest(GET_MEMBER_PROFILE, getMemberProfile);
}

export function* memberSagaPage() {
  yield all([
    fork(watchFetchAllMembers),
    fork(watchFetchAllMembersOfTeam),
    fork(watchGetMemberProfile)
  ]);
}