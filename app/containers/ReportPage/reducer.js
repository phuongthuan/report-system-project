import {
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCEEDED,
  FETCH_REPORTS_FAILED,

  CREATE_REPORT,
  CREATE_REPORT_SUCCEEDED,
  CREATE_REPORT_FAILED, UPDATE_REPORT_SUCCEEDED, UPDATE_REPORT_FAILED

} from './constants';

const initState = {
  reports: [],
  loading: false,
  error: false
}

function reportReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_REPORTS:
    case CREATE_REPORT:
      return {
        ...state,
        loading: true
      }

    case FETCH_REPORTS_SUCCEEDED:
      return {
        ...state,
        reports: action.reports,
        loading: false,
      }

    case CREATE_REPORT_SUCCEEDED:
      return {
        ...state,
        reports: [
          ...state.reports,
          action.report
        ],
        loading: false
      }

    case UPDATE_REPORT_SUCCEEDED:
      return {
        ...state,
        reports: state.reports.map(report =>
          report.id === action.id
            ? action.report
            : report
        ),
        loading: false
      }

    case FETCH_REPORTS_FAILED:
    case CREATE_REPORT_FAILED:
    case UPDATE_REPORT_FAILED:
      return {
        ...state,
        error: true,
        loading: false,
        reports: []
      }
    default:
      return state;
  }
}

export default reportReducer;
