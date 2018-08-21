import {
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_LOGOUT_FAILED, AUTH_LOGIN_REQUEST
} from './constants'

const auth = JSON.parse(localStorage.getItem('auth'));

const initState = {
  user: auth ? auth.user : {},
  loading: false,
  isAuthenticated: !!auth,
  error: {}
}

function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isAuthenticated: false
      }
    case AUTH_LOGIN_SUCCEEDED:
      return {
        ...state,
        user: action.userResponse,
        isAuthenticated: true
      }
    case AUTH_LOGOUT_SUCCEEDED:
      return {
        ...state,
        user: action.userResponse,
        isAuthenticated: false
      }
    case AUTH_LOGIN_FAILED:
    case AUTH_LOGOUT_FAILED:
      return {
        ...state,
        error: action.error,
        user: {}
      }
    default:
      return state
  }
}

export default authReducer;