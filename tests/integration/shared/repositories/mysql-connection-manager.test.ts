import { MySQLConnectionManager } from '@/shared/infra'
import { startMySQLTestContainer, stopMySQLTestContainer } from '@/tests/integration/configs/helpers.integration'

import { StartedMySqlContainer } from 'testcontainers'

describe('MySQLConnectionManager', () => {
  let container: StartedMySqlContainer
  let sut: MySQLConnectionManager

  beforeAll(async () => {
    container = await startMySQLTestContainer()
    sut = MySQLConnectionManager.getInstance()
  })

  afterAll(async () => await stopMySQLTestContainer(container))

  test('Should return same instance when getInstance is called', () => {
    const sut2 = MySQLConnectionManager.getInstance()

    expect(sut).toBe(sut2)
  })

  test('Should connect to database', async () => {
    await sut.connect()

    await expect(sut.isConnected()).resolves.toBeTruthy()
  })

  test('Should disconnect to database', async () => {
    await sut.connect()
    await sut.disconnect()

    await expect(sut.isConnected()).resolves.toBeFalsy()
  })
})
