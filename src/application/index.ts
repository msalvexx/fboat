import { startApp, closeApp } from '@/application/configs/server'
import { startDbConnection, stopDbConnection } from './factories'

startDbConnection()
  .then(async () => await startApp())
  .catch(async (err) => {
    await stopDbConnection()
    await closeApp(err)
    console.error(err)
  })
