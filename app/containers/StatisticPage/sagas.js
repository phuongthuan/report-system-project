import { put, call, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { GET_ALL_REPORTS_OF_TEAM } from "./constants";
import { callFetchAllReportsOfUser, callGetMembersOfTeam } from "../../requests";
import { getAllReportsOfTeamFailed, getAllReportsOfTeamSucceeded } from "./actions";
import { fetchAllReportsOfUserFailed } from "../ReportPage/actions";

export function* fetchAllReportsOfTeam(action) {
  try {
    yield delay(700);
    const members = yield call(callGetMembersOfTeam, action.teamName);
    const reports = yield members.map(function (member) {
      try {
        return call(callFetchAllReportsOfUser, member.id);
      } catch (error) {
        return put(fetchAllReportsOfUserFailed(error));
      }
    });
    const mergedReports = [].concat.apply([], reports);
    mergedReports.map(report => {
      const memberReport = members.filter(member => member.id === report.userId);
      if (memberReport && memberReport.length > 0) {
        report.userId = memberReport[0];
      }
      return null;
    });
    yield put(getAllReportsOfTeamSucceeded(mergedReports));
  } catch (error) {
    yield put(getAllReportsOfTeamFailed(error.message));
  }
}

export function* watchFetchAllReportsOfTeam() {
  yield takeLatest(GET_ALL_REPORTS_OF_TEAM, fetchAllReportsOfTeam);
}

export function* statisticSagaPage() {
  yield [
    fork(watchFetchAllReportsOfTeam)
  ]
}