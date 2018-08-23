import Router from 'koa-router'

export default (router: Router) =>
  require(process.cwd() + '/app/api').default(router)
