import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router-dom'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import vi from 'react-intl/locale-data/vi'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faUserTie,
  faClock,
  faCalendarAlt,
  faFrown,
  faSmile,
  faMobileAlt,
  faAddressBook,
  faSignOutAlt,
  faPencilAlt,
  faBook,
  faUserEdit,
  faSpinner,
  faAddressCard,
  faListAlt,
  faChartArea
} from '@fortawesome/free-solid-svg-icons'
import App from './containers/App'
import store from './store'
import history from './utils/history'

import { setLocale } from "./containers/App/actions";

addLocaleData([...en, ...vi]);

library.add(faUserTie, faEnvelope, faClock, faCalendarAlt, faFrown, faSmile, faMobileAlt, faAddressBook, faSignOutAlt, faPencilAlt, faChartArea, faBook, faUserEdit, faSpinner, faAddressCard, faListAlt)

if (localStorage.reportLang) {
  store.dispatch(setLocale(localStorage.reportLang))
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}/>
    </Router>
  </Provider>,
  document.getElementById('app')
)
