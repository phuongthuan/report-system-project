import { context } from './constants'

export const selectApp = state => state[context]
export const selectLocale = state => selectApp(state).lang
