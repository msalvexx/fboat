import { MySQLConnectionManager } from '@/repositories'
import path from 'path'
import { StartedMySqlContainer, MySqlContainer } from 'testcontainers'

let container: StartedMySqlContainer
let connectionManager: MySQLConnectionManager

export const startMySQLTestContainer = async (): Promise<StartedMySqlContainer> => {
  if (container === undefined) {
    container = await new MySqlContainer().withCmd(['--default-authentication-plugin=mysql_native_password']).start()
  }
  return container
}

export const stopMySQLTestContainer = async (): Promise<void> => {
  if (container !== undefined) await container.stop()
}

export const getTestConnectionManager = async (): Promise<MySQLConnectionManager> => {
  if (connectionManager !== undefined) return connectionManager
  const container = await startMySQLTestContainer()
  const config = {
    database: container.getDatabase(),
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getUserPassword(),
    entities: [path.resolve('src/repositories/entities/index.{js,ts}')],
    migrations: [path.resolve('migrations/*.{js,ts}')]
  }
  connectionManager = MySQLConnectionManager.getInstance()
  await connectionManager.connect(config)
  await connectionManager.runMigrations()
  return connectionManager
}

export const refreshDatabase = async (): Promise<void> => {
  if (connectionManager === undefined) return
  await connectionManager.truncateEntities()
}
