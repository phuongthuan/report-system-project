/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'

import globalReducer from 'containers/App/reducer'
import reportReducer from 'containers/ReportPage/reducer'
import learningReducer from 'containers/Learning/reducer'
import loginReducer from 'containers/LoginPage/reducer'

import { context as globalContext } from 'containers/App/constants'
import { context as learningContext } from 'containers/Learning/constants'
import { context as reportpageContext } from 'containers/ReportPage/constants'
import { context as loginpageContext } from 'containers/LoginPage/constants'

const reducer = combineReducers({
  [loginpageContext]: loginReducer,
  [reportpageContext]: reportReducer,
  [learningContext]: learningReducer,
  [globalContext]: globalReducer,
})

export default reducer;
