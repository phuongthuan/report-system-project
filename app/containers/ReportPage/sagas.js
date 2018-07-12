import { call, put, fork ,takeLatest } from 'redux-saga/effects'
import {
  callFetchReports,
  callCreateReport,
  callUpdateReport,
  callFetchAReport, callDeleteReport
} from '../../requests';
import {
  fetchReportsSucceeded,
  fetchReportsFailed,
  createReportSucceeded,
  createReportFailed,
  updateReportFailed,
  updateReportSucceeded,
  fetchAReportSucceeded,
  fetchAReportFailed, deleteReportSucceeded, deleteReportFailed
} from './actions';

import {
  CREATE_REPORT,
  UPDATE_REPORT,
  FETCH_REPORTS,
  FETCH_A_REPORT,
  DELETE_REPORT
} from './constants';

export function* fetchReports() {
  try {
    const reports = yield call(callFetchReports);
    yield put(fetchReportsSucceeded(reports));
  } catch (error) {
    yield put(fetchReportsFailed(error));
  }
}

export function* fetchAReport(action) {
  try {
    const report = yield call(callFetchAReport, action.id);
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
    const reportUpdatedReceived = yield call(callUpdateReport, action.reportUpdated);
    yield put(updateReportSucceeded(reportUpdatedReceived));
  } catch (error) {
    yield put(updateReportFailed(error));
  }
}

export function* deleteReport(action) {
  try {
    const result = yield call(callDeleteReport, action.reportId);
    yield put(deleteReportSucceeded(result));
  } catch (error) {
    yield put(deleteReportFailed(error));
  }
}

/*===========================================
 WATCH ALL ACTIONS
 ===========================================*/
export function* watchFetchReports() {
  yield takeLatest(FETCH_REPORTS, fetchReports);
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
    fork(watchFetchReports),
    fork(watchCreateReport),
    fork(watchUpdateReport),
    fork(watchDeleteReport)
  ];
}