import { context } from './constants'

export const selectProfilePage = state => state[context]
export const selectProfile = state => selectProfilePage(state).profile

