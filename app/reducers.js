/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux'

import globalReducer from 'containers/App/reducer'
import reportReducer from 'containers/ReportPage/reducer'
import learningReducer from 'containers/Learning/reducer'
import authReducer from 'containers/Auth/reducer'
import profileReducer from 'containers/ProfilePage/reducer'

import { context as globalContext } from 'containers/App/constants'
import { context as learningContext } from 'containers/Learning/constants'
import { context as reportpageContext } from 'containers/ReportPage/constants'
import { context as authpageContext } from 'containers/Auth/constants'
import { context as profilepageContext } from 'containers/ProfilePage/constants'

const reducer = combineReducers({
  [authpageContext]: authReducer,
  [profilepageContext]: profileReducer,
  [reportpageContext]: reportReducer,
  [learningContext]: learningReducer,
  [globalContext]: globalReducer,
})

export default reducer;
