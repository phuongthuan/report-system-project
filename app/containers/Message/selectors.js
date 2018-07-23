import { context } from './constants'

export const selectMessage = state => state[context]
export const selectMessages = state => selectMessage(state).messages
export const selectMessageLoading = state => selectMessage(state).loading
export const selectMessageError = state => selectMessage(state).error

