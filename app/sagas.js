import { all } from 'redux-saga/effects'
import reportPageSaga from 'containers/ReportPage/sagas';
import authPageSaga from "containers/Auth/sagas";
import profilePageSaga from "./containers/ProfilePage/sagas";
import { memberSagaPage } from "./containers/MemberPage/sagas";
import { statisticSagaPage } from "./containers/StatisticPage/sagas";
import messageSagaPage from "./containers/Message/sagas";
import { teamPageSaga } from "./containers/TeamPage/sagas";
import weeklyReportSagaPage from "./containers/WeeklyReport/sagas";

export default function* rootSaga() {
  yield all([
    authPageSaga(),
    teamPageSaga(),
    memberSagaPage(),
    messageSagaPage(),
    weeklyReportSagaPage(),
    statisticSagaPage(),
    profilePageSaga(),
    reportPageSaga()
  ]);
}
