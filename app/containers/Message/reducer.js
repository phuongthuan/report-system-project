import {
  CREATE_MESSAGE,
  FETCH_ALL_MESSAGES,
  FETCH_ALL_MESSAGES_SUCCEEDED,
  CREATE_MESSAGE_SUCCEEDED,
  FETCH_ALL_MESSAGES_FAILED,
  CREATE_MESSAGE_FAILED, DELETE_MESSAGE, DELETE_MESSAGE_SUCCEEDED, DELETE_MESSAGE_FAILED
} from './constants';

const initState = {
  messages: [],
  message: {},
  loading: false,
  error: false
}

function messageReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_MESSAGE:
    case FETCH_ALL_MESSAGES:
    case DELETE_MESSAGE:
      return {
        ...state,
        loading: true
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

    case DELETE_MESSAGE_SUCCEEDED:
      return {
        ...state,
        messages: state.messages.filter(message => message.id !== action.messageId),
        loading: false,
        error: false
      }

    case FETCH_ALL_MESSAGES_FAILED:
    case CREATE_MESSAGE_FAILED:
    case DELETE_MESSAGE_FAILED:
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
