import {
  FETCH_REPORTS_SUCCEEDED,
  FETCH_REPORTS_FAILED,
  CREATE_REPORT,
  CREATE_REPORT_SUCCEEDED,
  CREATE_REPORT_FAILED,
  UPDATE_REPORT_SUCCEEDED,
  UPDATE_REPORT_FAILED,
  DELETE_REPORT_SUCCEEDED,
  DELETE_REPORT_FAILED, FETCH_ALL_REPORTS_OF_USER, FETCH_ALL_REPORTS_OF_USER_SUCCEEDED,
  FETCH_ALL_REPORTS_OF_USER_FAILED, FETCH_A_REPORT, FETCH_A_REPORT_SUCCEEDED, FETCH_A_REPORT_FAILED

} from './constants';

const initState = {
  reports: [],
  report: {},
  loading: false,
  error: false
}

function reportReducer(state = initState, action) {
  switch (action.type) {
    case CREATE_REPORT:
    case FETCH_ALL_REPORTS_OF_USER:
    case FETCH_A_REPORT:
      return {
        ...state,
        loading: true
      }

    case FETCH_REPORTS_SUCCEEDED:
      return {
        ...state,
        reports: action.reportsReceived,
        loading: false,
      }

    case FETCH_ALL_REPORTS_OF_USER_SUCCEEDED:
      return {
        ...state,
        reports: action.reportsReceived,
        loading: false,
      }

    case FETCH_A_REPORT_SUCCEEDED:
      return {
        ...state,
        report: action.reportReceived,
        loading: false
      }

    case CREATE_REPORT_SUCCEEDED:
      return {
        ...state,
        reports: [
          ...state.reports,
          action.newReportReceived
        ],
        loading: false
      }

    case UPDATE_REPORT_SUCCEEDED:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.reportUpdated.id
            ? action.reportUpdated
            : report
        ),
        loading: false
      }

    case DELETE_REPORT_SUCCEEDED:
      return {
        ...state,
        reports: state.reports.filter(report => report.id !== action.reportId),
        loading: false
      }

    case FETCH_REPORTS_FAILED:
    case FETCH_A_REPORT_FAILED:
    case FETCH_ALL_REPORTS_OF_USER_FAILED:
    case CREATE_REPORT_FAILED:
    case UPDATE_REPORT_FAILED:
    case DELETE_REPORT_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        reports: [],
        report: {}
      }
    default:
      return state;
  }
}

export default reportReducer;
