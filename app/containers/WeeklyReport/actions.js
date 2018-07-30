import { CREATE_WEEKLY_REPORT, CREATE_WEEKLY_REPORT_FAILED, CREATE_WEEKLY_REPORT_SUCCEEDED } from "./constants";

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