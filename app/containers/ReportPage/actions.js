import {
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCEEDED,
  FETCH_REPORTS_FAILED,

  CREATE_REPORT,
  CREATE_REPORT_SUCCEEDED,
  CREATE_REPORT_FAILED,

  UPDATE_REPORT_SUCCEEDED,
  UPDATE_REPORT_FAILED

} from './constants';

// FETCH REPORTS ACTIONS:
export const fetchReports = () => ({
  type: FETCH_REPORTS
});

export const fetchReportsSucceeded = (reports) => ({
  type: FETCH_REPORTS_SUCCEEDED,
  reports
});

export const fetchReportsFailed = (error) => ({
  type: FETCH_REPORTS_FAILED,
  error
});

// CREATE REPORT ACTIONS:
export const createReport = (report) => ({
  type: CREATE_REPORT,
  report
});

export const createReportSucceeded = (report) => ({
  type: CREATE_REPORT_SUCCEEDED,
  report
});

export const createReportFailed = (error) => ({
  type: CREATE_REPORT_FAILED,
  error
});