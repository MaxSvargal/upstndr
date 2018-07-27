import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Context } from 'koa'

import App from '../../app/containers/App'
import Html from '../index.html'

type Assets = { js: string[] }

export default (ctx: Context, next: () => Promise<any>) => {
  const { js } = ctx.state.assets as Assets
  const context = {}

  ctx.body = renderToString(
    <Html
      body={
        <StaticRouter location={ctx.req.url} context={context}>
          <App />
        </StaticRouter>
      }
      js={js}
    />
  )
  next()
}
