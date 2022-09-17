import { MySQLConnectionManager } from '@/server/shared/infra'

describe('MySQLConnectionManager', () => {
  let sut: MySQLConnectionManager

  beforeAll(async () => {
    sut = MySQLConnectionManager.getInstance()
    await sut.connect()
  })

  afterAll(async () => await sut.disconnect())

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
