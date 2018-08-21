import { SET_LOCALE_SUCCEEDED } from './constants'

const initState = {
  lang: 'en'
}

export default function (state = initState, action) {
  switch (action.type) {
    case SET_LOCALE_SUCCEEDED:
      return {
        ...state,
        lang: action.langReceived
      }
    default:
      return state;
  }
}