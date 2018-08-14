import debug from 'debug'
import Koa, { Middleware } from 'koa'
import Router from 'koa-router'
import webpack, { Compiler }  from 'webpack'
import koaWebpack, { Options } from 'koa-webpack'

import initApi from './middlewares/api'
import react from './middlewares/react'
import webpackStats from './middlewares/webpackStats'

import config from '../webpack/development.config'

const compiler = webpack(config) as Compiler
const app = new Koa()
const router = new Router()

const initKoaServer = (koaWebpackMiddleware: Middleware) => {
  initApi(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(koaWebpackMiddleware)
    .use(webpackStats())
    .use(react)
    .listen(3000)

    debug('server')('Ready. Listen on http://localhost:3000')
}

koaWebpack(<Options>{
  compiler,
  config,
  devMiddleware: {
    serverSideRender: true,
    logLevel: 'warn'
  },
  hotClient: {
    logLevel: 'warn'
  }
}).then(initKoaServer)