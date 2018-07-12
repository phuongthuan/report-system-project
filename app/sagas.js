import { all } from 'redux-saga/effects'
import learningSaga from 'containers/Learning/saga';
import reportPageSaga from 'containers/ReportPage/sagas';
import loginPageSaga from "containers/LoginPage/sagas";

export default function* rootSaga() {
  yield all([
    loginPageSaga(),
    learningSaga(),
    reportPageSaga()
  ])
}
