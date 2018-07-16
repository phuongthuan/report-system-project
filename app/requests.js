import request from 'utils/request'

import {
  GET_KEYWORDS,
  GET_REPORTS,
  GET_ALL_REPORTS_OF_USER,
  GET_A_REPORT,
  CREATE_REPORT,
  UPDATE_REPORT,
  DELETE_REPORT,
  SEARCH_USERNAME,
  LOGIN
} from 'constants/API_URL'

export const callFetchKeywords = () => request('get', GET_KEYWORDS);
export const callFetchReports = () => request('get', GET_REPORTS);
export const callFetchAllReportsOfUser = userId => request('get', `${GET_ALL_REPORTS_OF_USER}/${userId}/reports`);
export const callFetchAReport = id => request('get', `${GET_A_REPORT}/${id}`);

export const callCreateReport = report => request('post', CREATE_REPORT, report);
export const callUpdateReport = report => request('put', `${UPDATE_REPORT}/${report.id}`, report)
export const callDeleteReport = id => request('delete', `${DELETE_REPORT}/${id}`)

export const callSearchUsername = username => request('get', `${SEARCH_USERNAME}?q=${username}`);
export const callLogin = options => request('post', LOGIN, options);
export const callLogout = () => localStorage.removeItem('auth');

