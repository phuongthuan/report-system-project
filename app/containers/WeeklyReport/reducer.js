import {
  CREATE_WEEKLY_REPORT, CREATE_WEEKLY_REPORT_FAILED, CREATE_WEEKLY_REPORT_SUCCEEDED, DELETE_WEEKLY_REPORT,
  DELETE_WEEKLY_REPORT_FAILED,
  DELETE_WEEKLY_REPORT_SUCCEEDED,
  GET_ALL_WEEKLY_REPORTS_OF_USER, GET_ALL_WEEKLY_REPORTS_OF_USER_FAILED, GET_ALL_WEEKLY_REPORTS_OF_USER_SUCCEEDED
} from "./constants";

const initState = {
  weekly_reports: [],
  weekly_report: {},
  loading: false,
  error: false
}

function weeklyReportReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_WEEKLY_REPORT:
    case GET_ALL_WEEKLY_REPORTS_OF_USER:
    case DELETE_WEEKLY_REPORT:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_WEEKLY_REPORTS_OF_USER_SUCCEEDED:
      return {
        ...state,
        weekly_reports: action.weeklyReportsReceived,
        loading: false
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

    case DELETE_WEEKLY_REPORT_SUCCEEDED:
      return {
        ...state,
        weekly_reports: state.weekly_reports.filter(wr => wr.id !== action.wrId),
        loading: false
      }
    case CREATE_WEEKLY_REPORT_FAILED:
    case GET_ALL_WEEKLY_REPORTS_OF_USER_FAILED:
    case DELETE_WEEKLY_REPORT_FAILED:
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
