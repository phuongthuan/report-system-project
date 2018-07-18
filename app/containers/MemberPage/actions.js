import {
  FETCH_ALL_MEMBERS_OF_TEAM, FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED
} from "./constants";

export const fetchAllMembersOfTeam = (team) => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM,
  team
});

export const fetchAllMembersOfTeamSucceeded = (membersReceived) => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED,
  membersReceived
});

export const fetchAllMembersOfTeamFailed = (error) => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  error
});


