import { context } from './constants'

export const selectLoginPage = state => state[context]
export const selectToken = state => selectLoginPage(state).token
export const selectUser = state => selectLoginPage(state).user
export const selectError = state => selectLoginPage(state).error
