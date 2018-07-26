import {
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_LOGOUT_FAILED, AUTH_LOGIN_REQUEST
} from './constants'

const auth = JSON.parse(localStorage.getItem('auth'));

const user = auth ? auth.user : undefined;

const initState = {
  user,
  loading: false,
  error: null
}

function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      }
    case AUTH_LOGIN_SUCCEEDED:
      return {
        ...state,
        user: action.userResponse
      }
    case AUTH_LOGOUT_SUCCEEDED:
      return {
        ...state,
        user: action.userResponse
      }
    case AUTH_LOGIN_FAILED:
    case AUTH_LOGOUT_FAILED:
      return {
        ...state,
        error: action.error,
        user: undefined
      }
    default:
      return state
  }
}

export default authReducer;