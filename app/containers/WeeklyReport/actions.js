import {
  CREATE_WEEKLY_REPORT,
  CREATE_WEEKLY_REPORT_FAILED,
  CREATE_WEEKLY_REPORT_SUCCEEDED,
  GET_ALL_WEEKLY_REPORTS_OF_USER,
  GET_ALL_WEEKLY_REPORTS_OF_USER_FAILED,
  GET_ALL_WEEKLY_REPORTS_OF_USER_SUCCEEDED
} from "./constants";


/*===========================================
 FETCH ALL WEEKLY REPORTS OF USER
 ===========================================*/
export const fetchAllWeeklyReportsOfUser = userId => ({
  type: GET_ALL_WEEKLY_REPORTS_OF_USER,
  userId
});

export const fetchAllWeeklyReportsOfUserSucceeded = weeklyReportsReceived => ({
  type: GET_ALL_WEEKLY_REPORTS_OF_USER_SUCCEEDED,
  weeklyReportsReceived
});

export const fetchAllWeeklyReportsOfUserFailed = error => ({
  type: GET_ALL_WEEKLY_REPORTS_OF_USER_FAILED,
  error
});

/*===========================================
 CREATE NEW WEEKLY_REPORT
 ===========================================*/
export const createWeeklyReport = newWeeklyReport => ({
  type: CREATE_WEEKLY_REPORT,
  newWeeklyReport
});
export const createWeeklyReportSucceeded = newWeeklyReportReceived => ({
  type: CREATE_WEEKLY_REPORT_SUCCEEDED,
  newWeeklyReportReceived
});
export const createWeeklyReportFailed = error => ({
  type: CREATE_WEEKLY_REPORT_FAILED,
  error
});