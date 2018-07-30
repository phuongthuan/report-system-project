import { take, put, call, takeLatest, all, fork } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { fetchAllTeamsFailed, fetchAllTeamsSucceeded } from "./actions";
import { callFetchAllWeeklyReportsOfUser, callFetchTeams, callGetProfile } from "../../requests";
import { FETCH_ALL_TEAMS } from "./constants";
import { getUserProfileFailed } from "../ProfilePage/actions";
import { fetchAllWeeklyReportsOfUserFailed } from "../WeeklyReport/actions";

export function* fetchAllTeams() {
  try {
    const teams = yield call(callFetchTeams);

    const teamsWithUserProfile = yield teams.map(function (team) {
      try {
        return call(callGetProfile, team.userId);
      } catch (error) {
        return put(getUserProfileFailed(error));
      }
    });

    teams.map(team => {
      const userTeam = teamsWithUserProfile.filter(userInfo => userInfo.id === team.userId);
      if (userTeam && userTeam.length > 0) {
        team.userId = userTeam[0];
      }
    });

    const teamsWithWeeklyReports = yield teams.map(function (team) {
      try {
        return call(callFetchAllWeeklyReportsOfUser, team.userId.id);
      } catch (error) {
        return put(fetchAllWeeklyReportsOfUserFailed(error));
      }
    });

    const mergedWeeklyReports = [].concat.apply([], teamsWithWeeklyReports);

    teams.map(team => {
      const weeklyReports = mergedWeeklyReports.filter(wr => wr.userId === team.userId.id);
      if (weeklyReports && weeklyReports.length > 0) {
        team.userId.weekly_reports = weeklyReports;
      }
    });

    yield delay(700);
    yield put(fetchAllTeamsSucceeded(teams));
  } catch (error) {
    yield put(fetchAllTeamsFailed(error));
  }
}

export function* watchFetchAllTeams() {
  yield takeLatest(FETCH_ALL_TEAMS, fetchAllTeams);
}

export function* teamPageSaga() {
  yield all([
    fork(watchFetchAllTeams)
  ]);
}