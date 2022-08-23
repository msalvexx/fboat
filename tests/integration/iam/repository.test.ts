import { MySQLAccountRepository } from '@/iam/infra/repositories'
import { MySQLAccount, MySQLUser } from '@/iam/infra/repositories/entities'

import { mockAccount } from '@/tests/mocks/iam'
import { refreshDatabase, getConnectionManager } from '@/tests/integration/configs/helpers.integration'
import { Repository } from 'typeorm'
import { MySQLRole } from '@/iam/infra/repositories/entities/MySQLRole'
import { Account, GetAccountByEmailRepository } from '@/iam/domain'
import { MySQLConnectionManager } from '@/shared/infra'

describe('AccountRepository', () => {
  let sut: MySQLAccountRepository
  let accountRepo: Repository<MySQLAccount>
  let userRepo: Repository<MySQLUser>
  let connectionManager: MySQLConnectionManager

  beforeAll(async () => {
    connectionManager = await getConnectionManager()
    accountRepo = connectionManager.getRepository(MySQLAccount)
    userRepo = connectionManager.getRepository(MySQLUser)
    sut = new MySQLAccountRepository(connectionManager)
  })

  beforeEach(async () => await refreshDatabase(connectionManager))
  afterAll(async () => await connectionManager.disconnect())

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
      photo: account.personalData.photo,
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

  test('Should return undefined if inexistent email was provided', async () => {
    const result = await sut.getByEmail('invalid@mail.com')

    expect(result).toBeUndefined()
  })

  test('Should return undefined if inexistent accountId was provided', async () => {
    const result = await sut.getByAccountId('invalid-account-id')

    expect(result).toBeUndefined()
  })

  test('Should return a valid account without roles', async () => {
    const account = mockAccount()
    await saveAccountOnDatabase(account)

    const result = await sut.getByEmail(account.user.email)

    expect(result).toStrictEqual(makeRepositoryResult(account))
  })

  test('Should return a account with roles by email when an existent email id provided', async () => {
    const account = mockAccount({
      user: { roles: ['Writer', 'FBoatReader'] }
    })
    const roles = [MySQLRole.Writer, MySQLRole.FBoatReader].join(',')
    await saveAccountOnDatabase(account, roles)

    const result = await sut.getByEmail(account.user.email)

    expect(result).toStrictEqual(makeRepositoryResult(account))
  })

  test('Should return a account when an existent accountId id provided', async () => {
    const account = mockAccount()
    await saveAccountOnDatabase(account)

    const result = await sut.getByAccountId(account.accountId)

    expect(result).toStrictEqual(makeRepositoryResult(account))
  })

  test('Should insert account correctly on database', async () => {
    const account = mockAccount({
      user: { roles: ['Writer', 'FBoatReader'] }
    })

    await sut.insert(account)

    const retrievedUser = await userRepo.findOne({ where: { email: account.user.email } }) as any
    expect(retrievedUser).not.toBeNull()
    expect(retrievedUser).toStrictEqual(new MySQLUser({
      userId: account.user.userId,
      email: account.user.email,
      password: account.user.password,
      roles: 'escritor,leitor-veleiro',
      account: {
        photo: account.personalData.photo,
        accountId: account.accountId,
        birthDate: account.personalData.birthDate,
        createdAt: retrievedUser.account.createdAt,
        updatedAt: retrievedUser.account.updatedAt,
        firstName: account.personalData.firstName,
        isActive: account.isActive,
        lastName: account.personalData.lastName,
        occupation: account.personalData.occupation
      }
    }))
  })

  test('Should update account correctly on database', async () => {
    const account = mockAccount()
    await saveAccountOnDatabase(account)
    account.changePersonalData({
      firstName: 'Jose',
      lastName: 'Carlos Augusto',
      birthDate: account.personalData.birthDate,
      occupation: account.personalData.occupation
    })
    account.user.changeRoles(['FBoatController'])

    await sut.update(account)

    const retrievedUser = await userRepo.findOne({ where: { email: account.user.email } }) as any
    expect(retrievedUser).not.toBeNull()
    expect(retrievedUser).toStrictEqual(new MySQLUser({
      userId: account.user.userId,
      email: account.user.email,
      password: account.user.password,
      roles: 'controlador-veleiro',
      account: {
        photo: account.personalData.photo,
        accountId: account.accountId,
        birthDate: account.personalData.birthDate,
        createdAt: retrievedUser.account.createdAt,
        updatedAt: retrievedUser.account.updatedAt,
        firstName: account.personalData.firstName,
        isActive: account.isActive,
        lastName: account.personalData.lastName,
        occupation: account.personalData.occupation
      }
    }))
  })
})
