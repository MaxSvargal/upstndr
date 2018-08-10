import { ConnectedRouter } from 'react-router-redux'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import createHistory from 'history/createBrowserHistory'
import React, { ComponentClass } from 'react'

declare global {
  interface Window {
    __PRELOADED_STATE__: object
  }
}

const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const history = createHistory()
const store = configureStore(preloadedState, history)

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