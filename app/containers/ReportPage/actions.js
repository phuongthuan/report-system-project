import {
  CREATE_REPORT,
  CREATE_REPORT_FAILED,
  CREATE_REPORT_SUCCEEDED,
  DELETE_REPORT,
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
  SEARCH_REPORT_FAILED,
  SEARCH_REPORT_SUCCEEDED,
  UPDATE_REPORT,
  UPDATE_REPORT_FAILED,
  UPDATE_REPORT_SUCCEEDED
} from './constants';

/*===========================================
 FETCH ALL REPORTS
 ===========================================*/
export const fetchAllReportsOfUser = id => ({
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
 FETCH ALL REPORTS BY DAY
 ===========================================*/
export const fetchAllReportsOfUserByDay = (id, date) => ({
  type: FETCH_ALL_REPORTS_OF_USER_BY_DAY,
  id,
  date
});
export const fetchAllReportsOfUserByDaySucceeded = reportsReceived => ({
  type: FETCH_ALL_REPORTS_OF_USER_BY_DAY_SUCCEEDED,
  reportsReceived
});
export const fetchAllReportsOfUserByDayFailed = error => ({
  type: FETCH_ALL_REPORTS_OF_USER_BY_DAY_FAILED,
  error
});

/*===========================================
 FETCH ALL REPORTS BY RANGE
 ===========================================*/
export const fetchAllReportsOfUserByRange = (id, range) => ({
  type: FETCH_ALL_REPORTS_OF_USER_BY_RANGE,
  id,
  range
});
export const fetchAllReportsOfUserByRangeSucceeded = reportsReceived => ({
  type: FETCH_ALL_REPORTS_OF_USER_BY_RANGE_SUCCEEDED,
  reportsReceived
});
export const fetchAllReportsOfUserByRangeFailed = error => ({
  type: FETCH_ALL_REPORTS_OF_USER_BY_RANGE_FAILED,
  error
});

/*===========================================
 FETCH A REPORT
 ===========================================*/
export const fetchAReport = id => ({
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
export const updateReport = reportUpdated => ({
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
export const deleteReport = reportId => ({
  type: DELETE_REPORT,
  reportId
});
export const deleteReportSucceeded = reportId => ({
  type: DELETE_REPORT_SUCCEEDED,
  reportId
});
export const deleteReportFailed = error => ({
  type: DELETE_REPORT_FAILED,
  error
})

/*===========================================
 SEARCH REPORT ACTION
 ===========================================*/
export const searchReport = payload => ({
  type: SEARCH_REPORT,
  payload
});
export const searchReportSucceeded = reportsReceived => ({
  type: SEARCH_REPORT_SUCCEEDED,
  reportsReceived
});
export const searchReportFailed = error => ({
  type: SEARCH_REPORT_FAILED,
  error
})
