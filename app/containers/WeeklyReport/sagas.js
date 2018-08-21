import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { delay } from 'redux-saga'
import { callCreateWeeklyReport, callDeleteWeeklyReport, callFetchAllWeeklyReportsOfUser } from "../../requests";
import {
  createWeeklyReportFailed, createWeeklyReportSucceeded, deleteWeeklyReportFailed, deleteWeeklyReportSucceeded,
  fetchAllWeeklyReportsOfUserSucceeded
} from "./actions";
import { CREATE_WEEKLY_REPORT, DELETE_WEEKLY_REPORT, GET_ALL_WEEKLY_REPORTS_OF_USER } from "./constants";

export function* fetchAllWeeklyReportsOfUser(action) {
  try {
    const weeklyReports = yield call(callFetchAllWeeklyReportsOfUser, action.userId);

    // const weeklyReportsWithUserInfo = yield all (weeklyReports.map(function (wr) {
    //   try {
    //     return call(callGetProfile, wr.userId);
    //   } catch (error) {
    //     return put(getUserProfileFailed(error));
    //   }
    // }));
    yield delay(700);
    yield put(fetchAllWeeklyReportsOfUserSucceeded(weeklyReports));
  } catch (error) {
    yield put(fetchAllWeeklyReportsOfUserSucceeded(error));
  }
}

export function* createWeeklyReport(action) {
  try {
    const weeklyReport = yield call(callCreateWeeklyReport, action.newWeeklyReport);
    yield put(createWeeklyReportSucceeded(weeklyReport));
  } catch (error) {
    yield put(createWeeklyReportFailed(error));
  }
}

export function* deleteWeeklyReport(action) {
  try {
    yield call(callDeleteWeeklyReport, action.id);
    yield put(deleteWeeklyReportSucceeded(action.id));
  } catch (error) {
    yield put(deleteWeeklyReportFailed(error));
  }
}

export function* watchCreateWeeklyReport() {
  yield takeLatest(CREATE_WEEKLY_REPORT, createWeeklyReport);
}

export function* watchFetchAllWeeklyReportsOfUser() {
  yield takeLatest(GET_ALL_WEEKLY_REPORTS_OF_USER, fetchAllWeeklyReportsOfUser);
}

export function* watchDeleteWeeklyReport() {
  yield takeLatest(DELETE_WEEKLY_REPORT, deleteWeeklyReport);
}

export default function* weeklyReportSagaPage() {
  yield all([
    fork(watchCreateWeeklyReport),
    fork(watchFetchAllWeeklyReportsOfUser),
    fork(watchDeleteWeeklyReport),
  ]);
}