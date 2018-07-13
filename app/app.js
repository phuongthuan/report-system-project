import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faPencilAlt, faBook, faUserEdit, faSpinner } from '@fortawesome/free-solid-svg-icons'
import App from './containers/App'
import store from './store'

library.add(faSignOutAlt, faPencilAlt, faBook, faUserEdit, faSpinner)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
)
