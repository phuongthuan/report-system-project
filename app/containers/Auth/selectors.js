import { context } from './constants'

export const selectAuthPage = state => state[context]
export const selectUser = state => selectAuthPage(state).user
export const selectIsAuthenticated = state => selectAuthPage(state).isAuthenticated
export const selectAuthLoading = state => selectAuthPage(state).loading
export const selectAuthError = state => selectAuthPage(state).error
