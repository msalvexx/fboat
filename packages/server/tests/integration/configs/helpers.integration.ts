import { EnvConfig } from '@/server/main/configs/env'
import { buildApp, closeApp } from '@/server/main/configs/server'
import { MySQLConnectionManager } from '@/server/shared/infra/repositories'
import jwt from 'jsonwebtoken'

const envConfig = EnvConfig.getInstance()

export const getConnectionManager = async (): Promise<MySQLConnectionManager> => {
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect()
  return connectionManager
}

export const refreshDatabase = async (connectionManager: MySQLConnectionManager): Promise<void> => {
  await connectionManager.truncateEntities()
  await connectionManager.runMigrations()
}

type ServerResponse = {
  connectionManager: MySQLConnectionManager
  serverInstance: any
}

export const startTestServer = async (): Promise<ServerResponse> => {
  const { connectionManager, serverInstance } = await buildApp()
  await connectionManager.runMigrations()
  await serverInstance.ready()
  return {
    serverInstance,
    connectionManager
  }
}

type TestServerParams = {
  serverInstance: any
}

export const stopTestServer = async ({ serverInstance }: TestServerParams): Promise<void> => {
  await closeApp(serverInstance)
}

export const createTestToken = (): string => jwt.sign({
  accountId: '0265bf42-67b2-46cb-933b-6c11400a22eb',
  userId: 'c77f7d99-c956-4dd2-a63f-b7a1ca6f28aa',
  email: 'admin@mail.com'
}, envConfig.configs.jwt.secret)
