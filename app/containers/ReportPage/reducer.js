import {
  CREATE_REPORT,
  CREATE_REPORT_FAILED,
  CREATE_REPORT_SUCCEEDED,
  DELETE_REPORT_FAILED,
  DELETE_REPORT_SUCCEEDED,
  FETCH_A_REPORT,
  FETCH_A_REPORT_FAILED,
  FETCH_A_REPORT_SUCCEEDED,
  FETCH_ALL_REPORTS_OF_USER,
  FETCH_ALL_REPORTS_OF_USER_BY_DAY,
  FETCH_ALL_REPORTS_OF_USER_BY_DAY_FAILED,
  FETCH_ALL_REPORTS_OF_USER_BY_DAY_SUCCEEDED,
  FETCH_ALL_REPORTS_OF_USER_BY_RANGE,
  FETCH_ALL_REPORTS_OF_USER_BY_RANGE_FAILED,
  FETCH_ALL_REPORTS_OF_USER_BY_RANGE_SUCCEEDED,
  FETCH_ALL_REPORTS_OF_USER_FAILED,
  FETCH_ALL_REPORTS_OF_USER_SUCCEEDED,
  SEARCH_REPORT,
  UPDATE_REPORT_FAILED,
  UPDATE_REPORT_SUCCEEDED
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
    case FETCH_ALL_REPORTS_OF_USER_BY_DAY:
    case FETCH_ALL_REPORTS_OF_USER_BY_RANGE:
    case FETCH_A_REPORT:
      return {
        ...state,
        loading: true
      }
    case FETCH_ALL_REPORTS_OF_USER_SUCCEEDED:
    case FETCH_ALL_REPORTS_OF_USER_BY_DAY_SUCCEEDED:
    case FETCH_ALL_REPORTS_OF_USER_BY_RANGE_SUCCEEDED:
      return {
        ...state,
        reports: action.reportsReceived,
        loading: false,
      }
    case SEARCH_REPORT:
      return {
        ...state,
        reports: state.reports.filter(report =>
          report.title.toLowerCase().includes(action.payload)
        )
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
          report.id === action.reportUpdatedReceived.id
            ? action.reportUpdatedReceived
            : report
        ),
        loading: false
      }
    case DELETE_REPORT_SUCCEEDED:
      return {
        ...state,
        reports: state.reports.filter(report =>
          report.id !== action.reportId
        ),
        loading: false
      }

    case FETCH_A_REPORT_FAILED:
    case FETCH_ALL_REPORTS_OF_USER_FAILED:
    case FETCH_ALL_REPORTS_OF_USER_BY_DAY_FAILED:
    case FETCH_ALL_REPORTS_OF_USER_BY_RANGE_FAILED:
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
