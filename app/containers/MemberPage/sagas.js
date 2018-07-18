import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { callGetMembersOfTeam } from "../../requests";
import { fetchAllMembersOfTeamFailed, fetchAllMembersOfTeamSucceeded } from "./actions";
import { FETCH_ALL_MEMBERS_OF_TEAM } from "./constants";

export function* fetchAllMembersOfTeam(action) {
  try {
    const members = yield call(callGetMembersOfTeam, action.team);
    yield delay(700);
    yield put(fetchAllMembersOfTeamSucceeded(members));
  } catch (error) {
    yield put(fetchAllMembersOfTeamFailed(error.message));
  }
}

export function* watchFetchAllMembersOfTeam() {
  yield takeLatest(FETCH_ALL_MEMBERS_OF_TEAM, fetchAllMembersOfTeam);
}

export function* memberSagaPage() {
  yield [
    fork(watchFetchAllMembersOfTeam)
  ]
}