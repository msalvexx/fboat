import Fastify, { FastifyInstance } from 'fastify'

import { auth } from '@/application/adapters/'
import iamRoutes from '@/application/routers/iam'
import { Configs } from './env'

const setupHooks = async (server: FastifyInstance): Promise<void> => {
  server.addHook('preHandler', auth)
}

const setupRoutes = async (server: FastifyInstance): Promise<void> => {
  await server.register(iamRoutes)
}

const server = Fastify()

export const startApp = async (): Promise<void> => {
  await setupHooks(server)
  await setupRoutes(server)
  const port = Configs.server.port
  try {
    const address = await server.listen({ port })
    console.log(`Server running at ${address}`)
  } catch (err) {
    console.log('Error starting server:', err)
  }
}

export const closeApp = async (reason: string | Error): Promise<void> => {
  await server.close()
  console.log('Server was closed by reason: ', reason)
}
