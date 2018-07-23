import { call, put, fork ,takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  callFetchReports,
  callCreateReport,
  callUpdateReport,
  callFetchAReport,
  callDeleteReport,
  callFetchAllReportsOfUser, callGetProfile
} from '../../requests';
import {
  fetchReportsSucceeded,
  fetchReportsFailed,
  createReportSucceeded,
  createReportFailed,
  updateReportFailed,
  updateReportSucceeded,
  fetchAReportSucceeded,
  fetchAReportFailed,
  deleteReportSucceeded,
  deleteReportFailed,
  fetchAllReportsOfUserFailed,
  fetchAllReportsOfUserSucceeded
} from './actions';

import {
  CREATE_REPORT,
  UPDATE_REPORT,
  FETCH_REPORTS,
  FETCH_A_REPORT,
  DELETE_REPORT, FETCH_ALL_REPORTS_OF_USER
} from './constants';
import { getUserProfileFailed } from "../ProfilePage/actions";

export function* fetchAllReportsOfUser(action) {
  try {
    const reports = yield call(callFetchAllReportsOfUser, action.id);
    yield delay(700);
    const users = yield reports.map(function (report) {
      try {
        return call(callGetProfile, report.userId);
      } catch (error) {
        return put(getUserProfileFailed(error));
      }
    });
    reports.map(report => {
      const userRelatedToReport = users.filter(user => user.id === report.userId);
      if (userRelatedToReport && userRelatedToReport.length > 0) {
        report.userId = userRelatedToReport[0];
      }
      return null;
    });
    yield put(fetchAllReportsOfUserSucceeded(reports));
  } catch (error) {
    yield put(fetchAllReportsOfUserFailed(error));
  }
}

export function* fetchAReport(action) {
  try {
    const report = yield call(callFetchAReport, action.id);
    yield delay(700);
    yield put(fetchAReportSucceeded(report));
  } catch (error) {
    yield put(fetchAReportFailed(error));
  }
}

export function* createReport(action) {
  try {
    const newReportReceived = yield call(callCreateReport, action.newReport);
    yield put(createReportSucceeded(newReportReceived));
  } catch (error) {
    yield put(createReportFailed(error));
  }
}

export function* updateReport(action) {
  try {
    const newReport = yield call(callUpdateReport, action.reportUpdated);
    yield put(updateReportSucceeded(newReport));
  } catch (error) {
    yield put(updateReportFailed(error));
  }
}

export function* deleteReport(action) {
  try {
    yield call(callDeleteReport, action.reportId);
    yield put(deleteReportSucceeded(action.reportId));
  } catch (error) {
    yield put(deleteReportFailed(error));
  }
}

/*===========================================
 WATCH ALL ACTIONS
 ===========================================*/
export function* watchFetchAllReportsOfUser() {
  yield takeLatest(FETCH_ALL_REPORTS_OF_USER, fetchAllReportsOfUser);
}

export function* watchFetchAReport() {
  yield takeLatest(FETCH_A_REPORT, fetchAReport);
}

export function* watchCreateReport() {
  yield takeLatest(CREATE_REPORT, createReport);
}

export function* watchUpdateReport() {
  yield takeLatest(UPDATE_REPORT, updateReport);
}

export function* watchDeleteReport() {
  yield takeLatest(DELETE_REPORT, deleteReport);
}

export default function* reportPageSaga() {
  yield [
    fork(watchFetchAllReportsOfUser),
    fork(watchFetchAReport),
    fork(watchCreateReport),
    fork(watchUpdateReport),
    fork(watchDeleteReport),
  ];
}