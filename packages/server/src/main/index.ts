import './configs/module-alias'
import { startApp, closeApp } from '@/server/main/configs'

import 'reflect-metadata'

startApp()
  .then(server => ['SIGINT', 'SIGTERM', 'SIGQUIT']
    .forEach(reason => process.on(reason, () => {
      console.log(`Server was closed by reason: ${reason} signal received`)
      closeApp(server)
        .then(() => process.exit())
        .catch(console.error)
    }))
  )
  .catch(console.error)
