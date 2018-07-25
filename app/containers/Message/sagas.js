import { call, put, fork ,takeLatest, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  createMessageFailed, createMessageSucceeded,
  fetchAllMessagesFailed,
  fetchAllMessagesSucceeded,
} from "./actions";
import { CREATE_MESSAGE, FETCH_ALL_MESSAGES } from "./constants";
import { callCreateMessage, callGetMessagesToUser, callGetProfile } from "../../requests";
import { getMemberProfileFailed } from "../MemberPage/actions";

export function* fetchAllMessages(action) {
  try {
    yield delay(700);
    const messages = yield call(callGetMessagesToUser, action.toUserId);
    const members = yield messages.map(function (message) {
      try {
        return call(callGetProfile, message.userId);
      } catch (error) {
        return put(getMemberProfileFailed(error));
      }
    });
    const messagesWithUser = messages.map(message => {
      const userMessage = members.filter(member => member.id === message.userId);
      if (userMessage && userMessage.length > 0) {
        message.userId = userMessage[0];
        return message
      }
      return null;
    });
    yield put(fetchAllMessagesSucceeded(messagesWithUser));
  } catch (error) {
    yield put(fetchAllMessagesFailed(error));
  }
}

export function* createMessage(action) {
  try {
    const message = yield call(callCreateMessage, action.newMessage);
    yield put(createMessageSucceeded(message));
  } catch (error) {
    return put(createMessageFailed(error));
  }
}

export function* watchFetchAllMessages() {
  yield takeLatest(FETCH_ALL_MESSAGES, fetchAllMessages);
}

export function* watchCreateMessage() {
  yield takeLatest(CREATE_MESSAGE, createMessage);
}

export default function* messageSagaPage() {
  yield all([
    fork(watchFetchAllMessages),
    fork(watchCreateMessage)
  ]);
}