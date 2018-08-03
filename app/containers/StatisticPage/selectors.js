import { context } from './constants'

export const selectStatisticPage = state => state[context]
export const selectReportsOfTeam = state => selectStatisticPage(state).reportsOfTeam
export const selectStatisticLoading = state => selectStatisticPage(state).loading
export const selectError = state => selectStatisticPage(state).error

