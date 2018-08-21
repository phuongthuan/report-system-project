import { context } from './constants'

export const selectWeeklyReportPage = state => state[context]
export const selectWeeklyReports = state => selectWeeklyReportPage(state).weekly_reports
export const selectWeeklyReportLoading = state => selectWeeklyReportPage(state).loading
export const selectWeeklyReportError = state => selectWeeklyReportPage(state).error

