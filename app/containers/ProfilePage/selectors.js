import { context } from './constants'

export const selectProfilePage = state => state[context]
export const selectProfile = state => selectProfilePage(state).profile
export const selectProfileLoading = state => selectProfilePage(state).loading
export const selectError = state => selectProfilePage(state).error

