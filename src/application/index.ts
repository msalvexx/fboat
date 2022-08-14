import { startApp, closeApp } from '@/application/configs/server'

startApp()
  .then(server => {
    console.log('Server is running')
    process.on('SIGTERM', () => {
      closeApp(server)
        .then(() => console.log('Server was closed by reason: SIGTERM received'))
        .catch(console.error)
    })
  })
  .catch(console.error)
