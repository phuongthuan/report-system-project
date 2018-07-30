import { CREATE_WEEKLY_REPORT, CREATE_WEEKLY_REPORT_FAILED, CREATE_WEEKLY_REPORT_SUCCEEDED } from "./constants";

const initState = {
  weekly_reports: [],
  weekly_report: {},
  loading: false,
  error: false
}

function weeklyReportReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_WEEKLY_REPORT:
      return {
        ...state,
        loading: true
      }
    case CREATE_WEEKLY_REPORT_SUCCEEDED:
      return {
        ...state,
        weekly_reports: [
          ...state.weekly_reports,
          action.newWeeklyReportReceived
        ],
        loading: false
      }
    case CREATE_WEEKLY_REPORT_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        weekly_reports: [],
        weekly_report: {}
      }
    default:
      return state;
  }
}

export default weeklyReportReducer;
