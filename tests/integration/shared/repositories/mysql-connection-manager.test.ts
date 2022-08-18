import { MySQLConnectionManager } from '@/shared/infra'
import { startMySQLTestContainer, stopMySQLTestContainer } from '@/tests/integration/configs/helpers.integration'

import { StartedMySqlContainer } from 'testcontainers'

describe('MySQLConnectionManager', () => {
  let container: StartedMySqlContainer
  let sut: MySQLConnectionManager

  beforeAll(async () => {
    container = await startMySQLTestContainer()
    sut = MySQLConnectionManager.getInstance()
    await sut.connect({
      database: container.getDatabase(),
      host: container.getHost(),
      port: container.getPort(),
      username: container.getUsername(),
      password: container.getUserPassword()
    })
  })

  afterAll(async () => await stopMySQLTestContainer(container))

  test('Should return same instance when getInstance is called', () => {
    const sut2 = MySQLConnectionManager.getInstance()

    expect(sut).toBe(sut2)
  })

  test('Should connect to database', async () => {
    await expect(sut.isConnected()).resolves.toBeTruthy()
  })

  test('Should disconnect to database', async () => {
    await sut.disconnect()

    await expect(sut.isConnected()).resolves.toBeFalsy()
  })
})
