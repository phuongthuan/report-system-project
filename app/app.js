import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { addLocaleData, IntlProvider } from 'react-intl'
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

import messages_en from "./translations/en.json";
import messages_vi from "./translations/vi.json";

addLocaleData([...en, ...vi]);

const messages = {
  'en': messages_en,
  'vi': messages_vi,
};

const language = navigator.language.toLowerCase().split(/[-_]/)[0];  // language without region code

library.add(faUserTie, faEnvelope, faClock, faCalendarAlt, faFrown, faSmile, faMobileAlt, faAddressBook, faSignOutAlt, faPencilAlt, faChartArea, faBook, faUserEdit, faSpinner, faAddressCard, faListAlt)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages[language]}>
      <Router history={history}>
        <App/>
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('app')
)
