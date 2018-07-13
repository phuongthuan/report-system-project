import {
  AUTH_SUCCEEDED,
  AUTH_FAILED
} from './constants'

let user = JSON.parse(localStorage.getItem('user'));

const initState = user
  ? { isAuthenticated: false, user, error: false }
  : {}

function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCEEDED:
      return {
        isAuthenticated: true,
        user: action.userResponse
      }
    case AUTH_FAILED:
      return {
        ...state,
        error: true,
        user: {}
      }
    default:
      return state
  }
}

export default authReducer;