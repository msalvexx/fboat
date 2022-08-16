import Fastify, { FastifyInstance } from 'fastify'

import { EnvConfig } from './env'
import { startDbConnection, stopDbConnection } from '@/application/factories'
import { mergeBody } from '@/application/adapters'
import { iamRoutes, loginRoute } from '@/application/routes'
import { MySQLConnectionManager } from '@/shared/infra'

const setupHooks = async (server: FastifyInstance): Promise<void> => {
  server.addHook('onClose', stopDbConnection)
  server.addHook('preHandler', mergeBody)
}

const setupRoutes = async (server: FastifyInstance): Promise<void> => {
  await server.register(loginRoute)
  await server.register(iamRoutes)
}

type App = {
  serverInstance: FastifyInstance
  connectionManager: MySQLConnectionManager
}

export const buildApp = async (config: any = null): Promise<App> => {
  const serverInstance = Fastify()
  const connectionManager = await startDbConnection(config)
  await setupHooks(serverInstance)
  await setupRoutes(serverInstance)
  return { serverInstance, connectionManager }
}

export const startApp = async (): Promise<FastifyInstance> => {
  const { serverInstance } = await buildApp()
  const port = EnvConfig.getInstance().configs.server.port
  const address = await serverInstance.listen({ port })
  console.log(`Server running at ${address}`)
  return serverInstance
}

export const closeApp = async (serverInstance: FastifyInstance, reason: string = 'unknown'): Promise<void> => {
  console.log(`Server was closed by reason: ${reason} signal received`)
  if (serverInstance === undefined) return
  await serverInstance.close()
}
