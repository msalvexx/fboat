import { MySQLAccountRepository, MySQLConnectionManager } from '@/repositories'
import { MySqlContainer, StartedMySqlContainer } from 'testcontainers'

import path from 'path'
import { MySQLAccount } from '@/repositories/entities'
import { mockAccount } from '../mocks'

describe('AccountRepository', () => {
  jest.setTimeout(240_000)

  let container: StartedMySqlContainer
  let config: any
  let sut: MySQLAccountRepository
  let connectionManager: MySQLConnectionManager

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
    connectionManager = MySQLConnectionManager.getInstance()
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

  test('Should return a valid account if email exists', async () => {
    const repository = connectionManager.getRepository(MySQLAccount)
    const account = mockAccount()
    await repository.save({
      accountId: account.accountId,
      birthDate: account.personalData.birthDate,
      createdAt: account.creationDate,
      updatedAt: account.updateDate,
      firstName: account.personalData.firstName,
      isActive: account.isActive,
      lastName: account.personalData.lastName,
      occupation: account.personalData.occupation,
      user: {
        email: account.user.email,
        password: account.user.password,
        userId: account.user.userId
      }
    })

    const result = await sut.getByEmail(account.user.email)

    expect(result).toStrictEqual(account)
  })
})
