import {
  GET_ALL_REPORTS_OF_TEAM, GET_ALL_REPORTS_OF_TEAM_BY_DAY, GET_ALL_REPORTS_OF_TEAM_BY_DAY_FAILED,
  GET_ALL_REPORTS_OF_TEAM_BY_DAY_SUCCEEDED, GET_ALL_REPORTS_OF_TEAM_BY_RANGE,
  GET_ALL_REPORTS_OF_TEAM_FAILED,
  GET_ALL_REPORTS_OF_TEAM_SUCCEEDED,
  GET_ALL_REPORTS_OF_TEAM_BY_RANGE_SUCCEEDED,
  GET_ALL_REPORTS_OF_TEAM_BY_RANGE_FAILED
} from "./constants";

export const getAllReportsOfTeam = teamName => ({
  type: GET_ALL_REPORTS_OF_TEAM,
  teamName
});

export const getAllReportsOfTeamSucceeded = reportsReceived => ({
  type: GET_ALL_REPORTS_OF_TEAM_SUCCEEDED,
  reportsReceived
});

export const getAllReportsOfTeamFailed = error => ({
  type: GET_ALL_REPORTS_OF_TEAM_FAILED,
  error
});

export const getAllReportsOfTeamByDay = (teamName, date) => ({
  type: GET_ALL_REPORTS_OF_TEAM_BY_DAY,
  teamName,
  date
});

export const getAllReportsOfTeamByDaySucceeded = reportsReceived => ({
  type: GET_ALL_REPORTS_OF_TEAM_BY_DAY_SUCCEEDED,
  reportsReceived
});

export const getAllReportsOfTeamByDayFailed = error => ({
  type: GET_ALL_REPORTS_OF_TEAM_BY_DAY_FAILED,
  error
});

export const getAllReportsOfTeamByRange = (teamName, range) => ({
  type: GET_ALL_REPORTS_OF_TEAM_BY_RANGE,
  teamName,
  range
});

export const getAllReportsOfTeamByRangeSucceeded = reportsReceived => ({
  type: GET_ALL_REPORTS_OF_TEAM_BY_RANGE_SUCCEEDED,
  reportsReceived
});

export const getAllReportsOfTeamByRangeFailed = error => ({
  type: GET_ALL_REPORTS_OF_TEAM_BY_RANGE_FAILED,
  error
});

