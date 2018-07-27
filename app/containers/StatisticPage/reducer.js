import {
  GET_ALL_REPORTS_OF_TEAM, GET_ALL_REPORTS_OF_TEAM_BY_DAY, GET_ALL_REPORTS_OF_TEAM_BY_DAY_FAILED,
  GET_ALL_REPORTS_OF_TEAM_BY_DAY_SUCCEEDED,
  GET_ALL_REPORTS_OF_TEAM_BY_RANGE,
  GET_ALL_REPORTS_OF_TEAM_BY_RANGE_FAILED, GET_ALL_REPORTS_OF_TEAM_BY_RANGE_SUCCEEDED,
  GET_ALL_REPORTS_OF_TEAM_FAILED,
  GET_ALL_REPORTS_OF_TEAM_SUCCEEDED
} from "./constants";

const initState = {
  reportsOfTeam: [],
  loading: false,
  error: false
}

function statisticReducer(state = initState, action) {
  switch (action.type) {
    case GET_ALL_REPORTS_OF_TEAM:
    case GET_ALL_REPORTS_OF_TEAM_BY_RANGE:
    case GET_ALL_REPORTS_OF_TEAM_BY_DAY:
      return {
        ...state,
        loading: true
      }
    case GET_ALL_REPORTS_OF_TEAM_BY_RANGE_SUCCEEDED:
    case GET_ALL_REPORTS_OF_TEAM_BY_DAY_SUCCEEDED:
    case GET_ALL_REPORTS_OF_TEAM_SUCCEEDED:
      return {
        ...state,
        reportsOfTeam: action.reportsReceived,
        loading: false,
        error: false
      }
    case GET_ALL_REPORTS_OF_TEAM_FAILED:
    case GET_ALL_REPORTS_OF_TEAM_BY_RANGE_FAILED:
    case GET_ALL_REPORTS_OF_TEAM_BY_DAY_FAILED:
      return {
        ...state,
        reportsOfTeam: [],
        error: true
      }
    default:
      return state
  }
}

export default statisticReducer;