import { MySQLAccountRepository } from '@/repositories'
import { MySQLAccount, MySQLUser } from '@/repositories/entities'

import { mockAccount } from '@/tests/mocks'
import { stopMySQLTestContainer, getTestConnectionManager, refreshDatabase } from '@/tests/configs/helpers.integration'
import { Repository } from 'typeorm'
import { MySQLRole } from '@/repositories/entities/MySQLRole'
import { Account, GetAccountByEmailRepository } from '@/iam'

describe('AccountRepository', () => {
  let sut: MySQLAccountRepository
  let accountRepo: Repository<MySQLAccount>
  let userRepo: Repository<MySQLUser>

  beforeAll(async () => {
    const connectionManager = await getTestConnectionManager()
    accountRepo = connectionManager.getRepository(MySQLAccount)
    userRepo = connectionManager.getRepository(MySQLUser)
    sut = new MySQLAccountRepository(connectionManager)
  })

  beforeEach(async () => await refreshDatabase())
  afterAll(async () => await stopMySQLTestContainer())

  const saveAccountOnDatabase = async (account: Account, roles: string = ''): Promise<void> => {
    await accountRepo.save({
      accountId: account.accountId,
      birthDate: account.personalData.birthDate,
      createdAt: account.creationDate,
      updatedAt: account.updateDate,
      firstName: account.personalData.firstName,
      isActive: account.isActive,
      lastName: account.personalData.lastName,
      occupation: account.personalData.occupation,
      user: {
        userId: account.user.userId,
        email: account.user.email,
        password: account.user.password,
        roles
      }
    })
  }

  const makeRepositoryResult = (account: Account): GetAccountByEmailRepository.Result => ({
    accountId: account.accountId,
    personalData: {
      birthDate: account.personalData.birthDate,
      firstName: account.personalData.firstName,
      lastName: account.personalData.lastName,
      occupation: account.personalData.occupation
    },
    creationDate: account.creationDate,
    updateDate: account.updateDate,
    isActive: account.isActive,
    user: {
      email: account.user.email,
      password: account.user.password,
      userId: account.user.userId,
      roles: account.user.roles.map(role => role.name)
    }
  })

  test('Should return null if account not found', async () => {
    const result = await sut.getByEmail('valid@mail.com')

    expect(result).toBeUndefined()
  })

  test('Should return a valid account without roles', async () => {
    const account = mockAccount()
    await saveAccountOnDatabase(account)

    const result = await sut.getByEmail(account.user.email)

    expect(result).toStrictEqual(makeRepositoryResult(account))
  })

  test('Should return a valid account with roles', async () => {
    const account = mockAccount({
      user: { roles: ['Writer', 'FBoatReader'] }
    })
    const roles = [MySQLRole.Writer, MySQLRole.FBoatReader].join(',')
    await saveAccountOnDatabase(account, roles)

    const result = await sut.getByEmail(account.user.email)

    expect(result).toStrictEqual(makeRepositoryResult(account))
  })

  test('Should save account correctly on database', async () => {
    const account = mockAccount({
      user: { roles: ['Writer', 'FBoatReader'] }
    })

    await sut.save(account)

    const retrievedUser = await userRepo.findOne({ where: { email: account.user.email } }) as any
    expect(retrievedUser).not.toBeNull()
    expect(retrievedUser).toStrictEqual(new MySQLUser({
      id: retrievedUser.id,
      email: retrievedUser.email,
      password: retrievedUser.password,
      userId: retrievedUser.userId,
      roles: retrievedUser.roles,
      account: {
        id: retrievedUser.account.id,
        accountId: retrievedUser.account.accountId,
        birthDate: retrievedUser.account.birthDate,
        createdAt: retrievedUser.account.createdAt,
        updatedAt: retrievedUser.account.updatedAt,
        firstName: retrievedUser.account.firstName,
        isActive: retrievedUser.account.isActive,
        lastName: retrievedUser.account.lastName,
        occupation: retrievedUser.account.occupation
      }
    }))
  })
})
