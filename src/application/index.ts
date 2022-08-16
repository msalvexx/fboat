import './configs/module-alias'
import { startApp, closeApp } from '@/application/configs/server'

import 'reflect-metadata'

startApp()
  .then(server => {
    ['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(reason => process.on(reason, () => {
      closeApp(server, reason)
        .then(() => {})
        .catch(console.error)
    }))
  })
  .catch(console.error)
