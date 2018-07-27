import React from 'react'
import { renderToString } from 'react-dom/server'
import { Context } from 'koa'

import App from '../../app/containers/App'
import Html from '../index.html'

type Assets = {
  js: string[]
}

export default (ctx: Context) => {
  const { js } = ctx.state.assets
  ctx.body = renderToString(<Html body={<App />} js={js} />)
}
