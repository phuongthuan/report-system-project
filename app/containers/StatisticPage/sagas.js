import { put, call, takeLatest, fork, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { GET_ALL_REPORTS_OF_TEAM, GET_ALL_REPORTS_OF_TEAM_BY_DAY, GET_ALL_REPORTS_OF_TEAM_BY_RANGE } from "./constants";
import { callFetchAllReportsOfUser, callGetMembersOfTeam } from "../../requests";
import {
  getAllReportsOfTeamByDayFailed,
  getAllReportsOfTeamByDaySucceeded,
  getAllReportsOfTeamByRangeFailed,
  getAllReportsOfTeamByRangeSucceeded,
  getAllReportsOfTeamFailed,
  getAllReportsOfTeamSucceeded
} from "./actions";
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
    yield delay(700);
    yield put(getAllReportsOfTeamSucceeded(mergedReports));
  } catch (error) {
    yield put(getAllReportsOfTeamFailed(error.message));
  }
}

export function* fetchAllReportsOfTeamByDay(action) {
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
    mergedReports.map(report => {
      const memberReport = members.filter(member => member.id === report.userId);
      if (memberReport && memberReport.length > 0) {
        report.userId = memberReport[0];
      }
      return null;
    });
    const reportByDay = mergedReports.filter(report => report.date === action.date)
    // console.log('reportByDay', reportByDay);
    yield delay(700);
    yield put(getAllReportsOfTeamByDaySucceeded(reportByDay));
  } catch (error) {
    yield put(getAllReportsOfTeamByDayFailed(error.message));
  }
}

export function* fetchAllReportsOfTeamByRange(action) {
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
    mergedReports.map(report => {
      const memberReport = members.filter(member => member.id === report.userId);
      if (memberReport && memberReport.length > 0) {
        report.userId = memberReport[0];
      }
      return null;
    });

    //filter by range:
    const reportByRange = mergedReports.filter(report => (report.date >= action.range[0] && report.date < action.range[1]));
    // console.log('Saga reportByRange', reportByRange);
    yield delay(700);
    yield put(getAllReportsOfTeamByRangeSucceeded(reportByRange));
  } catch (error) {
    yield put(getAllReportsOfTeamByRangeFailed(error.message));
  }
}

export function* watchFetchAllReportsOfTeam() {
  yield takeLatest(GET_ALL_REPORTS_OF_TEAM, fetchAllReportsOfTeam);
}

export function* watchFetchAllReportsOfTeamByDay() {
  yield takeLatest(GET_ALL_REPORTS_OF_TEAM_BY_DAY, fetchAllReportsOfTeamByDay);
}

export function* watchFetchAllReportsOfTeamByRange() {
  yield takeLatest(GET_ALL_REPORTS_OF_TEAM_BY_RANGE, fetchAllReportsOfTeamByRange);
}

export function* statisticSagaPage() {
  yield all([
    fork(watchFetchAllReportsOfTeam),
    fork(watchFetchAllReportsOfTeamByRange),
    fork(watchFetchAllReportsOfTeamByDay)
  ])
}