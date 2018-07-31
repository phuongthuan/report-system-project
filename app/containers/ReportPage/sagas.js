import { call, put, fork ,takeLatest, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  callCreateReport,
  callUpdateReport,
  callFetchAReport,
  callDeleteReport,
  callFetchAllReportsOfUser, callFetchAllReportsOfUserByDay, callFetchAllReportsOfUserByRange
} from '../../requests';
import {
  createReportSucceeded,
  createReportFailed,
  updateReportFailed,
  updateReportSucceeded,
  fetchAReportSucceeded,
  fetchAReportFailed,
  deleteReportSucceeded,
  deleteReportFailed,
  fetchAllReportsOfUserFailed,
  fetchAllReportsOfUserSucceeded,
  fetchAllReportsOfUserByDayFailed,
  fetchAllReportsOfUserByDaySucceeded,
  fetchAllReportsOfUserByRangeSucceeded,
  fetchAllReportsOfUserByRangeFailed
} from './actions';

import {
  CREATE_REPORT,
  UPDATE_REPORT,
  FETCH_A_REPORT,
  DELETE_REPORT, FETCH_ALL_REPORTS_OF_USER, FETCH_ALL_REPORTS_OF_USER_BY_DAY, FETCH_ALL_REPORTS_OF_USER_BY_RANGE
} from './constants';

export function* fetchAllReportsOfUser(action) {
  try {
    const reports = yield call(callFetchAllReportsOfUser, action.id);
    yield delay(700);
    yield put(fetchAllReportsOfUserSucceeded(reports));
  } catch (error) {
    yield put(fetchAllReportsOfUserFailed(error));
  }
}

export function* fetchAllReportsOfUserByDay(action) {

  const payload = {
    userId: action.id,
    date: action.date
  }

  try {
    const reports = yield call(callFetchAllReportsOfUserByDay, payload);
    const reportByDay = reports.filter(report => report.date === action.date);
    yield delay(700);
    yield put(fetchAllReportsOfUserByDaySucceeded(reportByDay));
  } catch (error) {
    yield put(fetchAllReportsOfUserByDayFailed(error));
  }
}

export function* fetchAllReportsOfUserByRange(action) {

  const payload = {
    userId: action.id,
    startDate: action.range[0],
    endDate: action.range[1],
  }

  try {
    const reports = yield call(callFetchAllReportsOfUserByRange, payload);
    const reportByRange = reports.filter(report => (report.date >= action.range[0] && report.date < action.range[1]));
    yield delay(700);
    yield put(fetchAllReportsOfUserByRangeSucceeded(reportByRange));
  } catch (error) {
    yield put(fetchAllReportsOfUserByRangeFailed(error));
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

export function* watchFetchAllReportsOfUserByDay() {
  yield takeLatest(FETCH_ALL_REPORTS_OF_USER_BY_DAY, fetchAllReportsOfUserByDay);
}

export function* watchFetchAllReportsOfUserByRange() {
  yield takeLatest(FETCH_ALL_REPORTS_OF_USER_BY_RANGE, fetchAllReportsOfUserByRange);
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
  yield all ([
    fork(watchFetchAllReportsOfUser),
    fork(watchFetchAllReportsOfUserByDay),
    fork(watchFetchAllReportsOfUserByRange),
    fork(watchFetchAReport),
    fork(watchCreateReport),
    fork(watchUpdateReport),
    fork(watchDeleteReport),
  ]);
}