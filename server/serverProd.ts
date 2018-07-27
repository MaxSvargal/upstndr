import path from 'path'
import debug from 'debug'
import Koa from 'koa'
import Router from 'koa-router'
import staticCache from 'koa-static-cache'
import webpack, { Stats }  from 'webpack'

import initApi from './middlewares/api'
import react from './middlewares/react'
import webpackStats from './middlewares/webpackStats'

import config from '../webpack/production.config'

const app = new Koa()
const router = new Router()

webpack(config, (err: Error, stats: Stats) => {
  if (err) throw err
  initApi(router)
  app
    .use(staticCache(path.join(__dirname, '../dist'), { maxAge: 86400000, gzip: true }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(webpackStats(stats))
    .use(react)
    .listen(3000)

  debug('server')('Ready. Listen on http://localhost:3000')
})
