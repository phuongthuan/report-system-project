import { call, put, fork, takeLatest, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  createMessageFailed, createMessageSucceeded, deleteMessageFailed, deleteMessageSucceeded,
  fetchAllMessagesFailed,
  fetchAllMessagesSucceeded,
} from "./actions";
import { CREATE_MESSAGE, DELETE_MESSAGE, FETCH_ALL_MESSAGES } from "./constants";
import { callCreateMessage, callDeleteMessage, callGetMessagesToUser, callGetProfile } from "../../requests";
import { getMemberProfileFailed } from "../MemberPage/actions";

export function* fetchAllMessages(action) {
  try {
    const messages = yield call(callGetMessagesToUser, action.toUserId);
    yield delay(700);
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
    yield put(createMessageFailed(error));
  }
}

export function* deleteMessage(action) {
  try {
    yield call(callDeleteMessage, action.id);
    yield put(deleteMessageSucceeded(action.id));
  } catch (error) {
    yield put(deleteMessageFailed(error.message));
  }
}

export function* watchFetchAllMessages() {
  yield takeLatest(FETCH_ALL_MESSAGES, fetchAllMessages);
}

export function* watchCreateMessage() {
  yield takeLatest(CREATE_MESSAGE, createMessage);
}

export function* watchDeleteMessage() {
  yield takeLatest(DELETE_MESSAGE, deleteMessage);
}

export default function* messageSagaPage() {
  yield all([
    fork(watchFetchAllMessages),
    fork(watchCreateMessage),
    fork(watchDeleteMessage),
  ]);
}