import { put, call, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { GET_ALL_REPORTS_OF_TEAM } from "./constants";
import { callFetchAllReportsOfUser, callGetMembersOfTeam } from "../../requests";
import { getAllReportsOfTeamFailed, getAllReportsOfTeamSucceeded } from "./actions";
import { fetchAllReportsOfUserFailed } from "../ReportPage/actions";

export function* fetchAllReportsOfTeam(action) {
  try {
    const members = yield call(callGetMembersOfTeam, action.teamName);

    const reports = yield members.map(function (member) {
      try {
        return call(callFetchAllReportsOfUser, member.id);
      } catch (error) {
        return put(fetchAllReportsOfUserFailed(error));
      }
    });
    const mergedReports = [].concat.apply([], reports);
    yield put(getAllReportsOfTeamSucceeded(mergedReports));
  } catch (error) {
    yield put(getAllReportsOfTeamFailed(error.message));
  }
}

Array.prototype.mapGen = function *mapGen (callback) {
  for (let i=0; i<this.length; i++) {
    yield callback(this[i])
  }
};

export function* watchFetchAllReportsOfTeam() {
  yield takeLatest(GET_ALL_REPORTS_OF_TEAM, fetchAllReportsOfTeam);
}

export function* statisticSagaPage() {
  yield [
    fork(watchFetchAllReportsOfTeam)
  ]
}