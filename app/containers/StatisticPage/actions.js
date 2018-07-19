import {
  GET_ALL_REPORTS_OF_TEAM, GET_ALL_REPORTS_OF_TEAM_FAILED,
  GET_ALL_REPORTS_OF_TEAM_SUCCEEDED
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

