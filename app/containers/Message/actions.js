import {
  CREATE_MESSAGE, CREATE_MESSAGE_FAILED, CREATE_MESSAGE_SUCCEEDED, FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE,
  FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_FAILED,
  FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_SUCCEEDED,
  FETCH_ALL_MESSAGES, FETCH_ALL_MESSAGES_FAILED,
  FETCH_ALL_MESSAGES_SUCCEEDED
} from "./constants";
import {
  FETCH_ALL_MEMBERS_OF_TEAM, FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED
} from "../MemberPage/constants";

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


/*===========================================
 FETCH ALL MEMBERS RELATED TO MESSAGE
 ===========================================*/
export const fetchAllMembersRelatedToMessage = (toUserId) => ({
  type: FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE,
  toUserId
});

export const fetchAllMembersRelatedToMessageSucceeded = membersMessageReceived => ({
  type: FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_SUCCEEDED,
  membersMessageReceived
});

export const fetchAllMembersRelatedToMessageFailed = error => ({
  type: FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_FAILED,
  error
});
