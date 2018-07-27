import path from 'path'
import debug from 'debug'
import Koa, { Middleware } from 'koa'
import Router from 'koa-router'
import mount from 'koa-mount'
import staticCache from 'koa-static-cache'
import webpack, { Compiler }  from 'webpack'
import koaWebpack, { Options } from 'koa-webpack'

import initApi from './middlewares/api'
import react from './middlewares/react'
import webpackStats from './middlewares/webpackStats'

import config from '../webpack/development.config'

debug.enable('server')
const log = debug('server')
const compiler = webpack(config) as Compiler
const app = new Koa()
const router = new Router()

console.log(`
================= WELCOME TO =================
 ██████╗ ████████╗ █████╗  ██████╗  █████╗ ██╗
██╔═══██╗╚══██╔══╝██╔══██╗██╔════╝ ██╔══██╗██║
██║   ██║   ██║   ███████║██║  ███╗███████║██║
██║   ██║   ██║   ██╔══██║██║   ██║██╔══██║██║
╚██████╔╝   ██║   ██║  ██║╚██████╔╝██║  ██║██║
 ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝
`)
log('Building...')

const initKoaServer = (koaWebpackMiddleware: Middleware) => {
  initApi(router)
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(koaWebpackMiddleware)
    .use(webpackStats)
    .use(react)
    .use(mount('/', staticCache(path.join(__dirname, '../dist'), { maxAge: 86400000, gzip: true })))
    .listen(3000)

  log('Ready. Listened on http://localhost:3000')
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