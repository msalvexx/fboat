import { MySQLTransactionManager } from '@/repositories/mysql-transaction-manager'
import { MySqlContainer, StartedMySqlContainer } from 'testcontainers'

describe('MySQLTransactionManager', () => {
  jest.setTimeout(240_000)

  let container: StartedMySqlContainer
  let config: any

  beforeAll(async () => {
    container = await new MySqlContainer().withCmd(['--default-authentication-plugin=mysql_native_password']).start()
    config = {
      database: container.getDatabase(),
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getUserPassword()
    }
  })

  afterAll(async () => {
    await container.stop()
  })

  test('Should return same instance when getInstance is called', () => {
    const sut = MySQLTransactionManager.getInstance()
    const sut2 = MySQLTransactionManager.getInstance()
    expect(sut).toBe(sut2)
  })

  test('Should connect to database', async () => {
    const sut = MySQLTransactionManager.getInstance()

    await sut.connect(config)

    await expect(sut.isConnected()).resolves.toBeTruthy()
  })
})
