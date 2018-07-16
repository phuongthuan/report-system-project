import {
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_SUCCEEDED,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCEEDED
} from "./constants";

const auth = JSON.parse(localStorage.getItem('auth'));

const profile = auth ? auth.user : undefined;

const initState = {
  profile,
  error: false
}

export function profileReducer(state = initState, action) {
  switch (action.type) {

    case GET_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        profile: action.profileReceived,
        error: false
      }

    case UPDATE_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        profile: action.profileUpdated,
        error: false
      }

    case GET_USER_PROFILE_FAILED:
    case UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        profile: {},
        error: true
      }

    default:
      return state
  }
}

export default profileReducer;