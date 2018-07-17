import { createStore, applyMiddleware, compose } from 'redux'
import 'regenerator-runtime/runtime'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import reducers from './reducers'
import { loadState, saveState } from './utils/localStorage'
import throttle from 'lodash/throttle'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle

// const persistedState = loadState();

const store = createStore(
  reducers,
  // persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

// store.subscribe(throttle(() => {
//   saveState({
//     access_token: store.getState().authpage.token,
//     user: store.getState().authpage.user,
//   })
// }, 1000));
//
// console.log('persistedState', persistedState);
// console.log('Store', store.getState().authpage.user);

sagaMiddleware.run(rootSaga)

export default store
