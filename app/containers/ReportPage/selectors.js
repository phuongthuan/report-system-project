import { context } from './constants'

export const selectReportPage = state => state[context]
export const selectReports = state => selectReportPage(state).reports
export const selectLoading = state => selectReportPage(state).loading
export const selectError = state => selectReportPage(state).error

