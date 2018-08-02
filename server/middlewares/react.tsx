import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Context } from 'koa'
import { Provider } from 'react-redux'
import configureStore from '../../app/store'

import App from '../../app/containers/App'
import Html from '../index.html'

import rootSaga from '../../app/containers/Home/saga'

type Assets = { js: string[] }

export default async (ctx: Context, next: () => Promise<any>) => {
  const { js } = ctx.state.assets as Assets
  const context = {}

  const store = configureStore({})

  // await store.runSaga(rootSaga).done
  // debug('server')('sagas complete')

  ctx.body = renderToString(
    <Html
      body={
        <StaticRouter location={ctx.req.url} context={context}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      }
      js={js}
    />
  )

  await next()
}
