import { FETCH_ALL_TEAMS, FETCH_ALL_TEAMS_FAILED, FETCH_ALL_TEAMS_SUCCEEDED } from "./constants";

const initState = {
  teams: [],
  loading: false,
  error: false
}

export function teamReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ALL_TEAMS:
      return {
        ...state,
        loading: true
      }
    case FETCH_ALL_TEAMS_SUCCEEDED:
      return {
        ...state,
        teams: action.teamsReceived,
        loading: false,
        error: false
      }

    case FETCH_ALL_TEAMS_FAILED:
      return {
        ...state,
        teams: [],
        error: true
      }
    default:
      return state;
  }
}

export default teamReducer;