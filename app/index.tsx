import { BrowserRouter } from 'react-router-dom'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import React, { ComponentClass } from 'react'

declare global {
  interface Window {
    __PRELOADED_STATE__: object
  }
}

const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

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