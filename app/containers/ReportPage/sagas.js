import { call, put, takeEvery } from 'redux-saga/effects'
import {
  callFetchReports,
  callCreateReport,
  callUpdateReport,
  callFetchAReport
} from '../../requests';
import {
  fetchReportsSucceeded,
  fetchReportsFailed,
  createReportSucceeded,
  createReportFailed,
  updateReportFailed,
  updateReportSucceeded,
  fetchAReportSucceeded,
  fetchAReportFailed
} from './actions';

import {
  CREATE_REPORT,
  UPDATE_REPORT,
  FETCH_REPORTS, FETCH_A_REPORT
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
    const newReport = yield call(callCreateReport, action.report);
    yield put(createReportSucceeded(newReport));
  } catch (error) {
    yield put(createReportFailed(error));
  }
}

export function* updateReport(action) {
  try {
    const updatedReport = yield call(callUpdateReport, action.id, action.payload);
    yield put(updateReportSucceeded(updatedReport));
  } catch (error) {
    yield put(updateReportFailed(error));
  }
}

export default function* reportPageSaga() {
  yield takeEvery(FETCH_REPORTS, fetchReports)
  yield takeEvery(FETCH_A_REPORT, fetchAReport)
  yield takeEvery(CREATE_REPORT, createReport)
  yield takeEvery(UPDATE_REPORT, updateReport)
}