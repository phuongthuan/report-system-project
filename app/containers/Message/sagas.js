import { call, put, fork ,takeLatest } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  fetchAllMembersRelatedToMessageFailed, fetchAllMembersRelatedToMessageSucceeded,
  fetchAllMessagesFailed,
  fetchAllMessagesSucceeded,
} from "./actions";
import { FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE, FETCH_ALL_MESSAGES } from "./constants";
import { callGetMessagesToUser, callGetProfile } from "../../requests";
import { getMemberProfileFailed } from "../MemberPage/actions";


export function* fetchAllMessages(action) {
  try {
    yield delay(700);
    const messages = yield call(callGetMessagesToUser, action.toUserId);
    yield put(fetchAllMessagesSucceeded(messages));
  } catch (error) {
    yield put(fetchAllMessagesFailed(error));
  }
}

export function* fetchAllMembersRelatedToMessage(action) {
  try {
    yield delay(700);
    const messages = yield call(callGetMessagesToUser, action.toUserId);
    const users = yield messages.map(function (message) {
      try {
        return call(callGetProfile, message.userId);
      } catch (error) {
        return put(getMemberProfileFailed(error));
      }
    });
    const mergedReports = [].concat.apply([], users);

    console.log('Saga', mergedReports);
    yield put(fetchAllMembersRelatedToMessageSucceeded(mergedReports));
  } catch (error) {
    yield put(fetchAllMembersRelatedToMessageFailed(error));
  }
}

export function* watchFetchAllMessages() {
  yield takeLatest(FETCH_ALL_MESSAGES, fetchAllMessages);
}

export function* watchFetchAllMembersRelatedToMessage() {
  yield takeLatest(FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE, fetchAllMembersRelatedToMessage);
}

export default function* messageSagaPage() {
  yield [
    fork(watchFetchAllMessages),
    fork(watchFetchAllMembersRelatedToMessage),
  ];
}