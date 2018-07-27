import { FETCH_ALL_TEAMS, FETCH_ALL_TEAMS_SUCCEEDED } from "./constants";
import { FETCH_ALL_MEMBERS_OF_TEAM_FAILED } from "../MemberPage/constants";

/*===========================================
 FETCH ALL REPORTS
 ===========================================*/

export const fetchAllTeams = () => ({
  type: FETCH_ALL_TEAMS
});
export const fetchAllTeamsSucceeded = teamsReceived => ({
  type: FETCH_ALL_TEAMS_SUCCEEDED,
  teamsReceived
});
export const fetchAllTeamsFailed = error => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  error
});
