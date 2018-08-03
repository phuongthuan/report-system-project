import {
  FETCH_ALL_MEMBERS, FETCH_ALL_MEMBERS_FAILED,
  FETCH_ALL_MEMBERS_OF_TEAM, FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED, FETCH_ALL_MEMBERS_SUCCEEDED, GET_MEMBER_PROFILE, GET_MEMBER_PROFILE_FAILED,
  GET_MEMBER_PROFILE_SUCCEEDED
} from "./constants";


const initState = {
  members: [],
  member: {},
  loading: false,
  error: false
}

export function memberReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ALL_MEMBERS:
    case FETCH_ALL_MEMBERS_OF_TEAM:
    case GET_MEMBER_PROFILE:
      return {
        ...state,
        loading: true
      }

    case FETCH_ALL_MEMBERS_SUCCEEDED:
      return {
        ...state,
        members: action.membersReceived,
        loading: false,
        error: false
      }

    case FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED:
      return {
        ...state,
        members: action.membersReceived,
        loading: false,
        error: false
      }
    case GET_MEMBER_PROFILE_SUCCEEDED:
      return {
        ...state,
        member: action.memberReceived,
        loading: false,
        error: false
      }

    case FETCH_ALL_MEMBERS_FAILED:
    case FETCH_ALL_MEMBERS_OF_TEAM_FAILED:
    case GET_MEMBER_PROFILE_FAILED:
      return {
        ...state,
        members: [],
        member: {},
        error: true
      }
    default:
      return state
  }
}

export default memberReducer;