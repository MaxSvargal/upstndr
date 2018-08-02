import Router from 'koa-router'

export default (router: Router) => {
  router.get('/api/test', ctx =>
    ctx.body = 'WAT'
  )

  router.post('api/test', ctx =>
    console.log(ctx.params)
  )
}