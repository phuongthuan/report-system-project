import {
  LOGIN_SUCCEEDED,
  LOGIN_FAILED
} from './constants'

const initState = {
  token: localStorage.getItem('token'),
  user: {},
  error: false
}

function loginReducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCEEDED:
      return {
        ...state,
        token: action.payload.access_token,
        user: action.payload.user
      }
    case LOGIN_FAILED:
      return {
        ...state,
        error: true,
        user: {}
      }
    default:
      return state
  }
}

export default loginReducer;