import request from 'utils/request'

import {
  GET_KEYWORDS,
  GET_REPORTS,
  GET_ALL_REPORTS_OF_USER,
  GET_A_REPORT,
  CREATE_REPORT,
  UPDATE_REPORT,
  DELETE_REPORT,
  UPDATE_USER_PROFILE,
  GET_USER_PROFILE,
  LOGIN,
  GET_MEMBERS_OF_TEAM,
  GET_MESSAGES,
  CREATE_MESSAGE
} from 'constants/API_URL'

export const callFetchKeywords = () => request('get', GET_KEYWORDS);
export const callFetchReports = () => request('get', GET_REPORTS);
export const callFetchAllReportsOfUser = userId => request('get', `${GET_ALL_REPORTS_OF_USER}/${userId}/reports?_sort=date&_order=desc`);
export const callFetchAReport = id => request('get', `${GET_A_REPORT}/${id}`);
export const callGetProfile = id => request('get', `${GET_USER_PROFILE}/${id}`)
export const callGetMembersOfTeam = payload => request('get', `${GET_MEMBERS_OF_TEAM}?division=${payload}`)
export const callGetMessagesToUser = payload => request('get', `${GET_MESSAGES}?toUser=${payload}&_sort=date&_order=desc`)


export const callCreateReport = report => request('post', CREATE_REPORT, report);
export const callCreateMessage = message => request('post', CREATE_MESSAGE, message);
export const callLogin = options => request('post', LOGIN, options);
export const callLogout = () => localStorage.removeItem('auth');

export const callUpdateProfile = payload => request('put', `${UPDATE_USER_PROFILE}/${payload.id}`, payload)
export const callUpdateReport = report => request('put', `${UPDATE_REPORT}/${report.id}`, report)

export const callDeleteReport = id => request('delete', `${DELETE_REPORT}/${id}`)
