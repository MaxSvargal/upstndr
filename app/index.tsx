import { ConnectedRouter } from 'connected-react-router'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import React, { ComponentClass } from 'react'

declare global {
  interface Window {
    __PRELOADED_STATE__: object
  }
}

const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const { store, history } = configureStore(preloadedState)

const render = (App: ComponentClass) =>
  hydrate(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  , document.getElementById('app'))

if (module.hot)
  module.hot.accept('containers/App', () =>
    render(require('containers/App').default))
render(require('containers/App').default)