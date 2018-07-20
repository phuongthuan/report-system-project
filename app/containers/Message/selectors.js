import { context } from './constants'

export const selectMessage = state => state[context]
export const selectMessages = state => selectMessage(state).messages
export const selectAMessage = state => selectMessage(state).message
export const selectMessageLoading = state => selectMessage(state).loading
export const selectMessageError = state => selectMessage(state).error
export const selectMembersRelatedToMessage = state => selectMessage(state).membersRelatedToMessage

