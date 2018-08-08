import {
  FETCH_ALL_TEAMS, FETCH_ALL_TEAMS_FAILED, FETCH_ALL_TEAMS_SUCCEEDED, FETCH_TEAM, FETCH_TEAM_FAILED,
  FETCH_TEAM_SUCCEEDED
} from "./constants";

/*===========================================
 FETCH ALL TEAMS
 ===========================================*/
export const fetchAllTeams = () => ({
  type: FETCH_ALL_TEAMS
});
export const fetchAllTeamsSucceeded = teamsReceived => ({
  type: FETCH_ALL_TEAMS_SUCCEEDED,
  teamsReceived
});
export const fetchAllTeamsFailed = error => ({
  type: FETCH_ALL_TEAMS_FAILED,
  error
});

/*===========================================
 FETCH TEAM
 ===========================================*/
export const fetchTeam = payload => ({
  type: FETCH_TEAM,
  payload
});
export const fetchTeamSucceeded = teamReceived => ({
  type: FETCH_TEAM_SUCCEEDED,
  teamReceived
});
export const fetchTeamFailed = error => ({
  type: FETCH_TEAM_FAILED,
  error
});

