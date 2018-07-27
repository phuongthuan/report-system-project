import { context } from './constants'

export const selectTeamPage = state => state[context]
export const selectTeams = state => selectTeamPage(state).teams
export const selectTeamLoading = state => selectTeamPage(state).loading
export const selectError = state => selectTeamPage(state).error

