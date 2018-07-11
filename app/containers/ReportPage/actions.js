import {
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCEEDED,
  FETCH_REPORTS_FAILED,

  FETCH_A_REPORT,
  FETCH_A_REPORT_SUCCEEDED,
  FETCH_A_REPORT_FAILED,

  CREATE_REPORT,
  CREATE_REPORT_SUCCEEDED,
  CREATE_REPORT_FAILED,

  UPDATE_REPORT,
  UPDATE_REPORT_SUCCEEDED,
  UPDATE_REPORT_FAILED

} from './constants';

// FETCH ALL REPORTS
export const fetchReports = () => ({
  type: FETCH_REPORTS
});

export const fetchReportsSucceeded = reports => ({
  type: FETCH_REPORTS_SUCCEEDED,
  reports
});

export const fetchReportsFailed = error => ({
  type: FETCH_REPORTS_FAILED,
  error
});


// FETCH A REPORT
export const fetchAReport = (id) => ({
  type: FETCH_A_REPORT,
  id
});

export const fetchAReportSucceeded = report => ({
  type: FETCH_A_REPORT_SUCCEEDED,
  report
});

export const fetchAReportFailed = error => ({
  type: FETCH_A_REPORT_FAILED,
  error
});

// CREATE NEW REPORT
export const createReport = report => ({
  type: CREATE_REPORT,
  report
});

export const createReportSucceeded = report => ({
  type: CREATE_REPORT_SUCCEEDED,
  report
});

export const createReportFailed = error => ({
  type: CREATE_REPORT_FAILED,
  error
});

// UPDATE A REPORT
export const updateReport = ({id, report}) => ({
  type: UPDATE_REPORT,
  payload: {id, report}
}) ;

export const updateReportSucceeded = report => ({
  type: UPDATE_REPORT_SUCCEEDED,
  report
});

export const updateReportFailed = error => ({
  type: UPDATE_REPORT_FAILED,
  error
});


