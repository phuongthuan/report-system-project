import {
  CREATE_MESSAGE,
  FETCH_ALL_MESSAGES,
  FETCH_ALL_MESSAGES_SUCCEEDED,
  CREATE_MESSAGE_SUCCEEDED,
  FETCH_ALL_MESSAGES_FAILED,
  CREATE_MESSAGE_FAILED, FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE, FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_SUCCEEDED,
  FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_FAILED

} from './constants';

const initState = {
  messages: [],
  message: {},
  memberRelatedToMessages: [],
  loading: false,
  error: false
}

function messageReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
    case FETCH_ALL_MESSAGES:
    case FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE:
      return {
        ...state,
        loading: true
      }

    case FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_SUCCEEDED:
      return {
        ...state,
        memberRelatedToMessages: action.membersMessageReceived,
        loading: false
      }

    case FETCH_ALL_MESSAGES_SUCCEEDED:
      return {
        ...state,
        messages: action.messagesReceived,
        loading: false,
      }

    case CREATE_MESSAGE_SUCCEEDED:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.newMessageReceived
        ],
        loading: false
      }

    case FETCH_ALL_MESSAGES_FAILED:
    case FETCH_ALL_MEMBERS_RELATED_TO_MESSAGE_FAILED:
    case CREATE_MESSAGE_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        messages: [],
        message: {}
      }
    default:
      return state;
  }
}

export default messageReducer;
