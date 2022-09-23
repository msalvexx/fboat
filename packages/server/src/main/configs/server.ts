import Fastify, { FastifyInstance } from 'fastify'
import swagger from '@fastify/swagger'
import cors from '@fastify/cors'
import fileUpload from 'fastify-file-upload'
import staticFile from '@fastify/static'

import { MySQLConnectionManager } from '@/server/shared/infra'
import { EnvConfig } from './env'
import { startDbConnection, stopDbConnection } from '@/server/main/factories'
import { mergeBody, swaggerConfig } from '@/server/main/adapters'
import { iamRoutes, loginRoute, contentSystemRoutes } from '@/server/main/routes'

const setupHooks = async (server: FastifyInstance): Promise<void> => {
  server.addHook('onClose', stopDbConnection)
  server.addHook('preHandler', mergeBody)
}

const setupPlugins = async (server: FastifyInstance): Promise<void> => {
  await server.register(swagger, swaggerConfig)
  await server.register(cors, EnvConfig.getInstance().configs.cors)
  await server.register(fileUpload, EnvConfig.getInstance().configs.fileUpload)
  await server.register(staticFile, EnvConfig.getInstance().configs.staticFile)
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
  const serverInstance = Fastify({ logger: true })
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
