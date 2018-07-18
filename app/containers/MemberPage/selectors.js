import { context } from './constants'

export const selectMemberPage = state => state[context]
export const selectMembers = state => selectMemberPage(state).members
export const selectLoading = state => selectMemberPage(state).loading
export const selectError = state => selectMemberPage(state).error

