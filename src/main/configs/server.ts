import Fastify, { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'

import { MySQLConnectionManager } from '@/shared/infra'
import { EnvConfig } from './env'
import { startDbConnection, stopDbConnection } from '@/main/factories'
import { mergeBody, swaggerConfig } from '@/main/adapters'
import { iamRoutes, loginRoute, contentSystemRoutes } from '@/main/routes'

const setupHooks = async (server: FastifyInstance): Promise<void> => {
  server.addHook('onClose', stopDbConnection)
  server.addHook('preHandler', mergeBody)
}

const setupPlugins = async (server: FastifyInstance): Promise<void> => {
  await server.register(swagger, swaggerConfig)
}

const setupRoutes = async (server: FastifyInstance): Promise<void> => {
  await server.register(loginRoute)
  await server.register(iamRoutes)
  await server.register(contentSystemRoutes)
}

type App = {
  serverInstance: FastifyInstance
  connectionManager: MySQLConnectionManager
}

export const buildApp = async (config: any = null): Promise<App> => {
  const serverInstance = Fastify()
  const connectionManager = await startDbConnection(config)
  await setupHooks(serverInstance)
  await setupPlugins(serverInstance)
  await setupRoutes(serverInstance)
  return { serverInstance, connectionManager }
}

export const startApp = async (): Promise<FastifyInstance> => {
  const { serverInstance } = await buildApp()
  const port = EnvConfig.getInstance().configs.server.port
  const address = await serverInstance.listen({ port })
  console.log(`Server running at ${address}`)
  serverInstance.swagger()
  return serverInstance
}

export const closeApp = async (serverInstance: FastifyInstance): Promise<void> => {
  if (serverInstance === undefined) return
  await serverInstance.close()
}
