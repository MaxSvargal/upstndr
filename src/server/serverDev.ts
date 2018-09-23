import path from 'path'
import debug from 'debug'
import Koa, { Middleware } from 'koa'
import Router from 'koa-router'
import webpack, { Compiler }  from 'webpack'
import koaWebpack, { Options } from 'koa-webpack'
import staticCache from 'koa-static-cache'
import json from 'koa-json'

import initApi from './middlewares/api'
import react from './middlewares/react'
import webpackStats from './middlewares/webpackStats'

import configImporter from '../webpack/importer'

const { PORT = 3000 } = process.env

const config = configImporter('development.config')
const compiler = webpack(config) as Compiler
const app = new Koa()
const router = new Router()

const initKoaServer = (koaWebpackMiddleware: Middleware) => {
  initApi(router)
  app
    .use(staticCache(path.join(process.cwd(), '/app/static'), { maxAge: 0, gzip: true, dynamic: true, prefix: '/static' }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(json())
    .use(koaWebpackMiddleware)
    .use(webpackStats())
    .use(react)
    .listen(PORT)

    debug('server')(`Ready. Listen on http://localhost:${PORT}`)
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