import { Context } from 'koa'
import { Stats }  from 'webpack'

export default (stats?: Stats) => (ctx: Context, next: any) => {
  type Stats = { assets: { name: string }[] }
  const st = stats || ctx.state.webpackStats

  const { assets }: Stats = st.toJson({ all: false, assets: true })
  const js = assets.map(({ name }) => name).filter(name => name.match(/\.js$/))
  
  ctx.state.assets = { js }
  next()
}