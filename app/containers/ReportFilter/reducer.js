import { SHOW_ALL_TIME, SET_REPORT_FILTER } from "./constants";

function reportFilterReducer(state = SHOW_ALL_TIME, action) {
  switch (action.type) {
    case SET_REPORT_FILTER:
      return action.filter
    default:
      return state;
  }
}

export default reportFilterReducer;