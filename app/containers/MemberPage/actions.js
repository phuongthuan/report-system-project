import {
  FETCH_ALL_MEMBERS_OF_TEAM,
  FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  FETCH_ALL_MEMBERS,
  FETCH_ALL_MEMBERS_FAILED,
  FETCH_ALL_MEMBERS_SUCCEEDED,
  FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED,
  GET_MEMBER_PROFILE,
  GET_MEMBER_PROFILE_SUCCEEDED
} from "./constants";

export const fetchAllMembers = () => ({
  type: FETCH_ALL_MEMBERS
});

export const fetchAllMembersSucceeded = membersReceived => ({
  type: FETCH_ALL_MEMBERS_SUCCEEDED,
  membersReceived
});

export const fetchAllMembersFailed = error => ({
  type: FETCH_ALL_MEMBERS_FAILED,
  error
});

export const fetchAllMembersOfTeam = team => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM,
  team
});

export const fetchAllMembersOfTeamSucceeded = membersReceived => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM_SUCCEEDED,
  membersReceived
});

export const fetchAllMembersOfTeamFailed = error => ({
  type: FETCH_ALL_MEMBERS_OF_TEAM_FAILED,
  error
});

export const getMemberProfile = memberId => ({
  type: GET_MEMBER_PROFILE,
  memberId
});

export const getMemberProfileSucceeded = memberReceived => ({
  type: GET_MEMBER_PROFILE_SUCCEEDED,
  memberReceived
});

export const getMemberProfileFailed = error => ({
  type: GET_MEMBER_PROFILE_SUCCEEDED,
  error
});





