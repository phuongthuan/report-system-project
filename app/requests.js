import request from 'utils/request'

import {
  GET_KEYWORDS,
  GET_REPORTS,
  GET_A_REPORT,
  CREATE_REPORT,
  UPDATE_REPORT,
  SEARCH_USERNAME,
  LOGIN

} from 'constants/API_URL'

export const callFetchKeywords = () => request('get', GET_KEYWORDS);
export const callFetchReports = () => request('get', GET_REPORTS);
export const callFetchAReport = (id) => request('get', `${GET_A_REPORT}/${id}`);

export const callCreateReport = report => request('post', CREATE_REPORT, report);
export const callUpdateReport = (id, payload) => request('post', `${UPDATE_REPORT}/${id}`, payload)

export const callSearchUsername = (username) => request('get', `${SEARCH_USERNAME}?q=${username}`);
export const callLogin = (payload) => request('post', LOGIN, payload);