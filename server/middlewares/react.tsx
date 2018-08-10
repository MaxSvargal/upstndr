import React from 'react'
import debug from 'debug'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Context } from 'koa'
import { Provider } from 'react-redux'
import { Task, END } from 'redux-saga'
import { renderStylesToString } from 'emotion-server'
import { LOCATION_CHANGE } from 'connected-react-router'

import configureStore, { Store } from '../../app/configureStore'
import Html from '../index.html'

const App = require(process.cwd() + '/app/containers/App').default

type Assets = { js: string[] }
type RenderProps = { url: string, context: object, js: string[] }

const render = ({ url, context, js }: RenderProps) => (store: Store, preloadedState?: object) =>
  renderStylesToString(renderToString(
    <Html
      body={
        <Provider store={store}>
          <StaticRouter location={url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      }
      js={js}
      state={preloadedState}
    />
  ))

export default async (ctx: Context, next: () => Promise<any>) => {
  debug('router')(`Request ${ctx.req.method}: ${ctx.req.url}`)
  const { js } = ctx.state.assets as Assets
  const url = ctx.req.url
  const context = {}
  const { store } = configureStore({}, url)
  const runRender = render({ url, context, js })

  // Initial render to collect sagas
  runRender(store)

  debug('server')('Sagas started')
  // notify Saga that there will be no more dispatches
  // this will break the while loop of watchers
  store.dispatch({ type: LOCATION_CHANGE, payload: { location: { pathname: url } } })
  store.dispatch(END)

  await Promise.all((Object as any)
    .values(store.injectedSagas)
    .map(({ task }: { task: Task }) => task.done)
  ).catch(console.log)

  debug('server')('Sagas completed')

  // Grab the initial state from store
  const preloadedState = store.getState()

  // Second render with filled store
  ctx.body = runRender(store, preloadedState)

  await next()
}
