import { SET_LOCALE } from './actions'

const initState = {
  lang: 'en'
}

export default function (state = initState, action) {
  switch (action.type) {
    case SET_LOCALE:
      return {
        ...state,
        lang: action.lang
      }
    default:
      return state;
  }
}