import { all } from 'redux-saga/effects'
import learningSaga from 'containers/Learning/saga';
import reportPageSaga from 'containers/ReportPage/sagas';

export default function* rootSaga() {
  yield all([
    learningSaga(),
    reportPageSaga()
  ])
}
