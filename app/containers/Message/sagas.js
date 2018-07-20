import { call, put, fork ,takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { fetchAllMessagesFailed, fetchAllMessagesSucceeded } from "./actions";
import { FETCH_ALL_MESSAGES } from "./constants";
import { callGetMessagesToUser } from "../../requests";


export function* fetchAllMessages(action) {
  try {
    yield delay(700);
    const messages = yield call(callGetMessagesToUser, action.toUserId);
    yield put(fetchAllMessagesSucceeded(messages));
  } catch (error) {
    yield put(fetchAllMessagesFailed(error));
  }
}

export function* watchFetchAllMessages() {
  yield takeLatest(FETCH_ALL_MESSAGES, fetchAllMessages);
}

export default function* messageSagaPage() {
  yield [
    fork(watchFetchAllMessages),
  ];
}