import request from 'utils/request'

import {
  GET_KEYWORDS,
  GET_REPORTS,
  CREATE_REPORT

} from 'constants/API_URL'

export const callFetchKeywords = () => request('get', GET_KEYWORDS);
export const callFetchReports = () => request('get', GET_REPORTS);
export const callCreateReport = report => request('post', CREATE_REPORT, report);