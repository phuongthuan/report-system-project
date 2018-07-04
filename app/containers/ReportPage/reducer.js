import {
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCEEDED,
  FETCH_REPORTS_FAILED,

  CREATE_REPORT,
  CREATE_REPORT_SUCCEEDED,
  CREATE_REPORT_FAILED

} from './constants';


const initState = {
  data: [],
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
        data: action.reports,
        loading: false,
      }

    case CREATE_REPORT_SUCCEEDED:
      return {
        ...state,
        data: [...state.data, action.report],
        loading: false
      }

    case FETCH_REPORTS_FAILED:
    case CREATE_REPORT_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
        data: []
      }
    default:
      return state;
  }
}

export default reportReducer;
