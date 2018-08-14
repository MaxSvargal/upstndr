import debug from 'debug'

const { version } = require('../../package.json')

const { NODE_ENV = 'development' } = process.env

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

debug.enable('server, router')

console.log(`
:::    ::: :::::::::   :::::::: ::::::::::: ::::    ::: :::::::::  ::::::::: 
:+:    :+: :+:    :+: :+:    :+:    :+:     :+:+:   :+: :+:    :+: :+:    :+:
+:+    +:+ +:+    +:+ +:+           +:+     :+:+:+  +:+ +:+    +:+ +:+    +:+
+#+    +:+ +#++:++#+  +#++:++#++    +#+     +#+ +:+ +#+ +#+    +:+ +#++:++#: 
+#+    +#+ +#+               +#+    +#+     +#+  +#+#+# +#+    +#+ +#+    +#+
#+#    #+# #+#        #+#    #+#    #+#     #+#   #+#+# #+#    #+# #+#    #+#
 ########  ###         ########     ###     ###    #### #########  ###    ###

==============================  v${version}  =====================================
`)
debug('server')(`${capitalize(NODE_ENV)} building...`)

if (NODE_ENV === 'development') require('./serverDev')
if (NODE_ENV === 'production') require('./serverProd')
