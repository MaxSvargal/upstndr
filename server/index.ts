import debug from 'debug'

const { NODE_ENV } = process.env
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

debug.enable('server')

console.log(`
================= WELCOME TO =================
 ██████╗ ████████╗ █████╗  ██████╗  █████╗ ██╗
██╔═══██╗╚══██╔══╝██╔══██╗██╔════╝ ██╔══██╗██║
██║   ██║   ██║   ███████║██║  ███╗███████║██║
██║   ██║   ██║   ██╔══██║██║   ██║██╔══██║██║
╚██████╔╝   ██║   ██║  ██║╚██████╔╝██║  ██║██║
 ╚═════╝    ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝
`)
debug('server')(`${capitalize(NODE_ENV)} building...`)

if (NODE_ENV === 'development') require('./serverDev')
if (NODE_ENV === 'production') require('./serverProd')
