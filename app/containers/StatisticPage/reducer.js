import { GET_ALL_REPORTS_OF_TEAM, GET_ALL_REPORTS_OF_TEAM_SUCCEEDED } from "./constants";

const initState = {
  reportsOfTeam: [],
  loading: false,
  error: false
}

function statisticReducer(state = initState, action) {
  switch (action.type) {

    case GET_ALL_REPORTS_OF_TEAM:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_REPORTS_OF_TEAM_SUCCEEDED:
      return {
        ...state,
        reportsOfTeam: action.reportsReceived,
        loading: false,
        error: false
      }
    default:
      return state
  }
}

export default statisticReducer;