import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { callCreateWeeklyReport } from "../../requests";
import { createWeeklyReportFailed, createWeeklyReportSucceeded } from "./actions";
import { CREATE_WEEKLY_REPORT } from "./constants";

export function* createWeeklyReport(action) {
  try {
    const weeklyReport = yield call(callCreateWeeklyReport, action.newWeeklyReport);
    yield put(createWeeklyReportSucceeded(weeklyReport));
  } catch (error) {
    yield put(createWeeklyReportFailed(error));
  }
}

export function* watchCreateWeeklyReport() {
  yield takeLatest(CREATE_WEEKLY_REPORT, createWeeklyReport);
}

export default function* weeklyReportSagaPage() {
  yield all([
    fork(watchCreateWeeklyReport),
  ]);
}