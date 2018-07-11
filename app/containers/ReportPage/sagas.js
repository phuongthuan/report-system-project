import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { callFetchReports, callCreateReport } from '../../requests';
import {
  fetchReportsSucceeded,
  fetchReportsFailed,

  createReportSucceeded,
  createReportFailed
} from './actions';

import { CREATE_REPORT, FETCH_REPORTS } from './constants';


// FETCH ALL REPORTS OF SPECIFIED USER.
export function* fetchReports() {
  try {
    const data = yield call(callFetchReports);
    yield put(fetchReportsSucceeded(data));
  } catch (error) {
    yield put(fetchReportsFailed(error));
  }
}

// USER CREATE A NEW REPORT.
export function* createReport(action) {
  try {
    const newReport = yield call(callCreateReport, action.report);
    yield put(createReportSucceeded(newReport));
  } catch (error) {
    yield put(createReportFailed(error));
  }
}

export default function* reportPageSaga() {
  yield takeEvery(FETCH_REPORTS, fetchReports)
  yield takeEvery(CREATE_REPORT, createReport)
}