import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_FAILED,
  CREATE_MESSAGE_SUCCEEDED,
  FETCH_ALL_MESSAGES,
  FETCH_ALL_MESSAGES_FAILED,
  FETCH_ALL_MESSAGES_SUCCEEDED
} from "./constants";

/*===========================================
 FETCH ALL MESSAGES
 ===========================================*/
export const fetchAllMessages = (toUserId) => ({
  type: FETCH_ALL_MESSAGES,
  toUserId
});

export const fetchAllMessagesSucceeded = messagesReceived => ({
  type: FETCH_ALL_MESSAGES_SUCCEEDED,
  messagesReceived
});

export const fetchAllMessagesFailed = error => ({
  type: FETCH_ALL_MESSAGES_FAILED,
  error
});

/*===========================================
 CREATE NEW MESSAGE
 ===========================================*/
export const createMessage = newMessage => ({
  type: CREATE_MESSAGE,
  newMessage
});

export const createMessageSucceeded = newMessageReceived => ({
  type: CREATE_MESSAGE_SUCCEEDED,
  newMessageReceived
});

export const createMessageFailed = error => ({
  type: CREATE_MESSAGE_FAILED,
  error
});
