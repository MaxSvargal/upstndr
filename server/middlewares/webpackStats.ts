import { Context } from 'koa'

export default (ctx: Context, next: any) => {
  type Stats = { assets: { name: string }[] }
  const { assets } = ctx.state.webpackStats.toJson({ all: false, assets: true }) as Stats
  const js = assets.map(({ name }) => name).filter(name => name.match(/\.js$/))
  
  ctx.state.assets = { js }
  next()
}