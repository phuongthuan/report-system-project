import { put, call, takeLatest, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import moment from 'moment'
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


    //filter by month
    // const reportByMonth = mergedReports.filter(report => (report.date >= '2018-09-01' && report.date < '2018-09-31'));
    //
    // const resultsReportByMonth = reportByMonth.map(report => ({
    //   id: report.id,
    //   date: moment(report.date).format("YYYY-MM-DD"),
    // }));
    //
    // console.log('Saga reportByMonth', resultsReportByMonth);
    //
    //
    // //filter by week:
    // const reportByWeek = mergedReports.filter(report => (report.date >= '2018-09-01' && report.date < '2018-09-07'));
    //
    // const resultsReportByWeek = reportByWeek.map(report => ({
    //   id: report.id,
    //   date: moment(report.date).format("YYYY-MM-DD"),
    // }));
    // console.log('Saga reportByWeek', resultsReportByWeek);
    //
    //
    // //filter by day:
    // const reportByDay = mergedReports.filter(report => (report.date === '2018-09-19T05:23:57.476Z'));
    //
    // const resultsReportByDay = reportByDay.map(report => ({
    //   id: report.id,
    //   date: moment(report.date).format("YYYY-MM-DD"),
    // }));
    // console.log('Saga reportByDay', resultsReportByDay);



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