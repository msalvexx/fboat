import { MySQLAccountRepository, MySQLConnectionManager } from '@/repositories'
import { MySqlContainer, StartedMySqlContainer } from 'testcontainers'

import path from 'path'

describe('AccountRepository', () => {
  jest.setTimeout(240_000)

  let container: StartedMySqlContainer
  let config: any
  let sut: MySQLAccountRepository

  beforeAll(async () => {
    container = await new MySqlContainer().withCmd(['--default-authentication-plugin=mysql_native_password']).start()
    config = {
      database: container.getDatabase(),
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getUserPassword(),
      entities: [path.resolve('src/repositories/entities/index.{js,ts}')],
      migrations: [path.resolve('migrations/*.{js,ts}')]
    }
    const connectionManager = MySQLConnectionManager.getInstance()
    await connectionManager.connect(config)
    await connectionManager.runMigrations()
    sut = new MySQLAccountRepository(connectionManager)
  })

  afterAll(async () => {
    await container.stop()
  })

  test('Should return null if account not found', async () => {
    const result = await sut.getByEmail('valid@mail.com')

    expect(result).toBeUndefined()
  })
})
