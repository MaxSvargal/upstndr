import React, { ComponentClass } from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'

const initialState = {}
const store = configureStore(initialState)

const render = (App: ComponentClass) => hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  , document.getElementById('app'))

if (module.hot)
  module.hot.accept('containers/App', () =>
    render(require('containers/App').default))
render(require('containers/App').default)