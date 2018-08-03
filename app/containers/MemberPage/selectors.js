import { context } from './constants'

export const selectMemberPage = state => state[context]
export const selectMembers = state => selectMemberPage(state).members
export const selectMember = state => selectMemberPage(state).member
export const selectMemberLoading = state => selectMemberPage(state).loading
export const selectError = state => selectMemberPage(state).error

