import { all } from 'redux-saga/effects'
import learningSaga from 'containers/Learning/saga';
import reportPageSaga from 'containers/ReportPage/sagas';
import authPageSaga from "containers/Auth/sagas";
import profilePageSaga from "./containers/ProfilePage/sagas";

export default function* rootSaga() {
  yield all([
    authPageSaga(),
    profilePageSaga(),
    learningSaga(),
    reportPageSaga()
  ])
}
