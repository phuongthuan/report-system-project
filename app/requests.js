import request from 'utils/request'

import {
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
  CREATE_MESSAGE,
  GET_MEMBERS,
  DELETE_MESSAGE,
  GET_TEAMS
} from 'constants/API_URL'

export const callFetchReports = () => request('get', GET_REPORTS);
export const callFetchTeams = () => request('get', GET_TEAMS);
export const callFetchAllReportsOfUser = userId => request('get', `${GET_ALL_REPORTS_OF_USER}/${userId}/reports?_sort=date&_order=desc`);
export const callFetchAllReportsOfUserByDay = payload => request('get', `${GET_ALL_REPORTS_OF_USER}/${payload.userId}/reports?date=${payload.date}`);
export const callFetchAllReportsOfUserByRange = payload => request('get', `${GET_ALL_REPORTS_OF_USER}/${payload.userId}/reports?date_gte=${payload.startDate}&date_lte=${payload.endDate}`);
export const callFetchAReport = id => request('get', `${GET_A_REPORT}/${id}`);
export const callGetProfile = id => request('get', `${GET_USER_PROFILE}/${id}`)
export const callGetMembersOfTeam = payload => request('get', `${GET_MEMBERS_OF_TEAM}?division=${payload}&_page=1`)
export const callGetMembers = () => request('get', `${GET_MEMBERS}?_page=1`)
export const callGetMessagesToUser = payload => request('get', `${GET_MESSAGES}?toUser=${payload}&_sort=date&_order=desc`)

export const callCreateReport = report => request('post', CREATE_REPORT, report);
export const callCreateMessage = message => request('post', CREATE_MESSAGE, message);
export const callLogin = options => request('post', LOGIN, options);
export const callLogout = () => localStorage.removeItem('auth');

export const callUpdateProfile = payload => request('put', `${UPDATE_USER_PROFILE}/${payload.id}`, payload)
export const callUpdateReport = report => request('put', `${UPDATE_REPORT}/${report.id}`, report)

export const callDeleteReport = id => request('delete', `${DELETE_REPORT}/${id}`)
export const callDeleteMessage = id => request('delete', `${DELETE_MESSAGE}/${id}`)
