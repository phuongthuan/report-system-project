import { SET_CURRENT_USER, SET_USER_NAME } from './constants'

const initState = {
  username: '',
  token: '',
  user: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, username: action.username }
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}
