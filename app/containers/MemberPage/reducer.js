import {
  FETCH_ALL_MEMBERS_OF_TEAM, FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED
} from "./constants";

const initState = {
  members: [],
  loading: false,
  error: false
}

export function memberReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ALL_MEMBERS_OF_TEAM:
      return {
        ...state,
        loading: true
      }
    case FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED:
      return {
        ...state,
        members: action.membersReceived,
        loading: false,
        error: false
      }
    case FETCH_ALL_MEMBERS_OF_TEAM_FAILED:
      return {
        ...state,
        members: [],
        error: true
      }
    default:
      return state
  }
}

export default memberReducer;