import { context } from './constants'

export const selectAuthPage = state => state[context]
export const selectUser = state => selectAuthPage(state).user
export const selectError = state => selectAuthPage(state).error
