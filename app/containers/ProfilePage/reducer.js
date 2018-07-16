import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAILED,
  GET_USER_PROFILE_SUCCEEDED,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_SUCCEEDED
} from "./constants";

const initState = {
  profile: {},
  error: false,
  loading: false
}

export function profileReducer(state = initState, action) {
  switch (action.type) {

    case GET_USER_PROFILE:
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        loading: true
      }

    case GET_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        profile: action.profileReceived,
        loading: false,
        error: false
      }

    case UPDATE_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        profile: action.profileUpdated,
        error: false,
        loading: false
      }

    case GET_USER_PROFILE_FAILED:
    case UPDATE_USER_PROFILE_FAILED:
      return {
        ...state,
        profile: {},
        error: true,
        loading: false
      }

    default:
      return state
  }
}

export default profileReducer;