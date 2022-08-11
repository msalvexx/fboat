import { MySQLConnectionManager } from '@/shared/infra'
import { startMySQLTestContainer, stopMySQLTestContainer } from '@/tests/integration/configs/helpers.integration'

import { StartedMySqlContainer } from 'testcontainers'

describe('MySQLConnectionManager', () => {
  let container: StartedMySqlContainer
  let config: any
  let sut: MySQLConnectionManager

  beforeAll(async () => {
    container = await startMySQLTestContainer()
    config = {
      database: container.getDatabase(),
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getUserPassword()
    }
    sut = MySQLConnectionManager.getInstance()
  })

  afterAll(async () => await stopMySQLTestContainer())

  test('Should return same instance when getInstance is called', () => {
    const sut2 = MySQLConnectionManager.getInstance()

    expect(sut).toBe(sut2)
  })

  test('Should connect to database', async () => {
    await sut.connect(config)

    await expect(sut.isConnected()).resolves.toBeTruthy()
  })

  test('Should disconnect to database', async () => {
    await sut.connect(config)
    await sut.disconnect()

    await expect(sut.isConnected()).resolves.toBeFalsy()
  })
})
