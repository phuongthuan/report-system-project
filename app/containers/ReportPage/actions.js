import {
  FETCH_REPORTS,
  FETCH_REPORTS_SUCCEEDED,
  FETCH_REPORTS_FAILED,
  FETCH_ALL_REPORTS_OF_USER,
  FETCH_ALL_REPORTS_OF_USER_SUCCEEDED,
  FETCH_ALL_REPORTS_OF_USER_FAILED,
  FETCH_A_REPORT,
  FETCH_A_REPORT_SUCCEEDED,
  FETCH_A_REPORT_FAILED,
  CREATE_REPORT,
  CREATE_REPORT_SUCCEEDED,
  CREATE_REPORT_FAILED,
  UPDATE_REPORT,
  UPDATE_REPORT_SUCCEEDED,
  UPDATE_REPORT_FAILED,
  DELETE_REPORT,
  DELETE_REPORT_SUCCEEDED,
  DELETE_REPORT_FAILED
} from './constants';

/*===========================================
 FETCH ALL REPORTS
 ===========================================*/
export const fetchReports = () => ({
  type: FETCH_REPORTS
});

export const fetchReportsSucceeded = reportsReceived => ({
  type: FETCH_REPORTS_SUCCEEDED,
  reportsReceived
});

export const fetchReportsFailed = error => ({
  type: FETCH_REPORTS_FAILED,
  error
});

/*===========================================
 FETCH ALL REPORTS
 ===========================================*/
export const fetchAllReportsOfUser = (id) => ({
  type: FETCH_ALL_REPORTS_OF_USER,
  id
});

export const fetchAllReportsOfUserSucceeded = reportsReceived => ({
  type: FETCH_ALL_REPORTS_OF_USER_SUCCEEDED,
  reportsReceived
});

export const fetchAllReportsOfUserFailed = error => ({
  type: FETCH_ALL_REPORTS_OF_USER_FAILED,
  error
});

/*===========================================
 FETCH A REPORT
 ===========================================*/
export const fetchAReport = (id) => ({
  type: FETCH_A_REPORT,
  id
});

export const fetchAReportSucceeded = reportReceived => ({
  type: FETCH_A_REPORT_SUCCEEDED,
  reportReceived
});

export const fetchAReportFailed = error => ({
  type: FETCH_A_REPORT_FAILED,
  error
});

/*===========================================
 CREATE NEW REPORT
 ===========================================*/
export const createReport = newReport => ({
  type: CREATE_REPORT,
  newReport
});

export const createReportSucceeded = newReportReceived => ({
  type: CREATE_REPORT_SUCCEEDED,
  newReportReceived
});

export const createReportFailed = error => ({
  type: CREATE_REPORT_FAILED,
  error
});

/*===========================================
 UPDATE A REPORT
 ===========================================*/
export const updateReport = (reportUpdated) => ({
  type: UPDATE_REPORT,
  reportUpdated
}) ;

export const updateReportSucceeded = reportUpdatedReceived => ({
  type: UPDATE_REPORT_SUCCEEDED,
  reportUpdatedReceived
});

export const updateReportFailed = error => ({
  type: UPDATE_REPORT_FAILED,
  error
});


/*===========================================
 DELETE A REPORT ACTION
 ===========================================*/
export const deleteReport = (reportId) => ({
  type: DELETE_REPORT,
  reportId
});

export const deleteReportSucceeded = (message) => ({
  type: DELETE_REPORT_SUCCEEDED,
  message
});

export const deleteReportFailed = (error) => ({
  type: DELETE_REPORT_FAILED,
  error
})





