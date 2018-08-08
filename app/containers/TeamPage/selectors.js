import { context } from './constants'

export const selectTeamPage = state => state[context]
export const selectTeams = state => selectTeamPage(state).teams
export const selectTeam = state => selectTeamPage(state).team
export const selectTeamLoading = state => selectTeamPage(state).loading
export const selectError = state => selectTeamPage(state).error

