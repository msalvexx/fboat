import { EnvConfig } from '@/shared/application/configs/env'
import { buildApp, closeApp } from '@/shared/application/configs/server'
import { MySQLConnectionManager } from '@/shared/infra/repositories'
import { StartedMySqlContainer, MySqlContainer } from 'testcontainers'
import jwt from 'jsonwebtoken'

type Params = {
  streamLogsEnabled: boolean
}
const defaultParams = { streamLogsEnabled: false }
const envConfig = EnvConfig.getInstance()

export const startMySQLTestContainer = async ({ streamLogsEnabled }: Params = defaultParams): Promise<StartedMySqlContainer> => {
  const container = await new MySqlContainer()
    .withCmd(['--default-authentication-plugin=mysql_native_password'])
    .start()
  if (streamLogsEnabled) {
    const stream = await container.logs()
    stream
      .on("data", line => console.log(line))
      .on("err", line => console.error(line))
      .on("end", () => console.log("Stream closed"))
  }
  envConfig
    .changeDbConfig({
      database: container.getDatabase(),
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getUserPassword()
    })
  return container
}

export const stopMySQLTestContainer = async (container: StartedMySqlContainer): Promise<void> => {
  if (container === undefined) return
  await container.stop()
}

export const stopTestDatabase = stopMySQLTestContainer

export const startTestDatabase = async (): Promise<any> => {
  const container = await startMySQLTestContainer()
  const connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect({
    database: container.getDatabase(),
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getUserPassword()
  })
  await connectionManager.runMigrations()
  return { container, connectionManager }
}

export const refreshDatabase = async (connectionManager: MySQLConnectionManager): Promise<void> => {
  await connectionManager.truncateEntities()
  await connectionManager.runMigrations()
}

type ServerResponse = {
  container: StartedMySqlContainer
  connectionManager: MySQLConnectionManager
  serverInstance: any
}

export const startTestServer = async (): Promise<ServerResponse> => {
  const container = await startMySQLTestContainer()
  const config = {
    database: container.getDatabase(),
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getUserPassword()
  }
  const { connectionManager, serverInstance } = await buildApp(config)
  await connectionManager.runMigrations()
  await serverInstance.ready()
  return {
    serverInstance,
    container,
    connectionManager
  }
}

type TestServerParams = {
  container: StartedMySqlContainer
  serverInstance: any
}

export const stopTestServer = async ({ container, serverInstance }: TestServerParams): Promise<void> => {
  await closeApp(serverInstance)
  await stopMySQLTestContainer(container)
}

export const createTestToken = (): string => jwt.sign({
  accountId: '0265bf42-67b2-46cb-933b-6c11400a22eb',
  userId: 'c77f7d99-c956-4dd2-a63f-b7a1ca6f28aa',
  email: 'admin@mail.com'
}, envConfig.configs.jwt.secret)
