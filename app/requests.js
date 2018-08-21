import request from 'utils/request'

import {
  CREATE_MESSAGE,
  CREATE_REPORT,
  CREATE_WEEKLY_REPORT,
  DELETE_MESSAGE,
  DELETE_REPORT,
  GET_A_REPORT,
  GET_ALL_REPORTS_OF_USER,
  GET_MEMBERS,
  GET_MEMBERS_OF_TEAM,
  GET_MESSAGES,
  GET_REPORTS,
  GET_TEAMS,
  GET_USER_PROFILE,
  GET_WEEKLY_REPORTS,
  LOGIN,
  UPDATE_REPORT,
  UPDATE_USER_PROFILE
} from 'constants/API_URL'

export const callFetchReports = () => request('get', GET_REPORTS);
export const callFetchTeams = () => request('get', GET_TEAMS);
export const callFetchTeam = id => request('get', `${GET_TEAMS}/${id}`);
export const callFetchAllReportsOfUser = userId => request('get', `${GET_ALL_REPORTS_OF_USER}/${userId}/reports?_sort=date&_order=desc`);
export const callFetchAllReportsOfUserByDay = payload => request('get', `${GET_ALL_REPORTS_OF_USER}/${payload.userId}/reports?date=${payload.date}`);
export const callFetchAllReportsOfUserByRange = payload => request('get', `${GET_ALL_REPORTS_OF_USER}/${payload.userId}/reports?date_gte=${payload.startDate}&date_lte=${payload.endDate}`);
export const callFetchAReport = id => request('get', `${GET_A_REPORT}/${id}`);
export const callGetProfile = id => request('get', `${GET_USER_PROFILE}/${id}`)
export const callGetMembersOfTeam = payload => request('get', `${GET_MEMBERS_OF_TEAM}?division=${payload}&_page=1`)
export const callGetMembers = () => request('get', `${GET_MEMBERS}?_sort=role&_order=desc`)
export const callGetMessagesToUser = payload => request('get', `${GET_MESSAGES}?toUser=${payload}&_sort=date&_order=desc`)
export const callFetchAllWeeklyReportsOfUser = id => request('get', `${GET_WEEKLY_REPORTS}?userId=${id}`)
export const callSearchReport = text => request('get', `${GET_REPORTS}?q=${text}`)
export const callSearchReportOfUser = payload => request('get', `${GET_REPORTS}?userId=${payload.userId}&q=${payload.text}`)

export const callCreateReport = report => request('post', CREATE_REPORT, report);
export const callCreateMessage = message => request('post', CREATE_MESSAGE, message);
export const callCreateWeeklyReport = weeklyReport => request('post', CREATE_WEEKLY_REPORT, weeklyReport);
export const callLogin = options => request('post', LOGIN, options);
export const callLogout = () => localStorage.removeItem('auth');

export const callUpdateProfile = payload => request('put', `${UPDATE_USER_PROFILE}/${payload.id}`, payload)
export const callUpdateReport = report => request('put', `${UPDATE_REPORT}/${report.id}`, report)

export const callDeleteReport = id => request('delete', `${DELETE_REPORT}/${id}`)
export const callDeleteMessage = id => request('delete', `${DELETE_MESSAGE}/${id}`)
export const callDeleteWeeklyReport = id => request('delete', `${GET_WEEKLY_REPORTS}/${id}`)

export const callChangeLocale = lang => localStorage.reportLang = lang;
