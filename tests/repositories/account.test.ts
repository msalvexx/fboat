import { MySQLAccountRepository, MySQLConnectionManager } from '@/repositories'
import { MySQLAccount } from '@/repositories/entities'

import { mockAccount } from '@/tests/mocks'
import { stopMySQLTestContainer, getTestConnectionManager, refreshDatabase } from '@/tests/configs/helpers.integration'

describe('AccountRepository', () => {
  let sut: MySQLAccountRepository
  let connectionManager: MySQLConnectionManager

  beforeAll(async () => {
    connectionManager = await getTestConnectionManager()
    sut = new MySQLAccountRepository(connectionManager)
  })

  beforeEach(async () => await refreshDatabase())
  afterAll(async () => await stopMySQLTestContainer())

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
