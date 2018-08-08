import {
  FETCH_ALL_TEAMS, FETCH_ALL_TEAMS_FAILED, FETCH_ALL_TEAMS_SUCCEEDED, FETCH_TEAM, FETCH_TEAM_FAILED,
  FETCH_TEAM_SUCCEEDED
} from "./constants";

const initState = {
  teams: [],
  team: {},
  loading: false,
  error: false
}

export function teamReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_ALL_TEAMS:
    case FETCH_TEAM:
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

    case FETCH_TEAM_SUCCEEDED:
      return {
        ...state,
        team: action.teamReceived,
        loading: false,
        error: false
      }

    case FETCH_ALL_TEAMS_FAILED:
    case FETCH_TEAM_FAILED:
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