import { Account, GetAccountByAccountId, GetAccountByEmailRepository, SaveAccountRepository } from '@/iam'
import { MySQLAccount, MySQLUser } from '@/iam/infra/repositories/entities'
import { MySQLConnectionManager } from '@/shared/infra'

import { Repository } from 'typeorm'
import { MySQLRole } from './entities/MySQLRole'

export class MySQLAccountRepository implements GetAccountByEmailRepository, SaveAccountRepository, GetAccountByAccountId {
  private readonly userRepo: Repository<MySQLUser>
  private readonly accountRepo: Repository<MySQLAccount>

  constructor (readonly connection: MySQLConnectionManager = MySQLConnectionManager.getInstance()) {
    this.userRepo = connection.getRepository(MySQLUser)
    this.accountRepo = connection.getRepository(MySQLAccount)
  }

  async getByAccountId (accountId: GetAccountByAccountId.Params): Promise<GetAccountByAccountId.Result> {
    const dbAccount = await this.accountRepo.findOne({ where: { accountId }, relations: { user: true } })
    if (dbAccount === null) return undefined
    return {
      accountId: dbAccount.accountId,
      user: {
        userId: dbAccount.user.userId,
        email: dbAccount.user.email,
        password: dbAccount.user.password,
        roles: dbAccount.user.roles.split(',').filter(x => x !== '').map(x => MySQLRole.getKeyByValue(x))
      },
      personalData: {
        birthDate: dbAccount.birthDate,
        firstName: dbAccount.firstName,
        lastName: dbAccount.lastName,
        occupation: dbAccount.occupation
      },
      creationDate: dbAccount.createdAt,
      updateDate: dbAccount.updatedAt,
      isActive: dbAccount.isActive
    }
  }

  async getByEmail (email: string): Promise<GetAccountByEmailRepository.Result> {
    const dbUser = await this.userRepo.findOne({ where: { email } })
    if (dbUser === null) return undefined
    return {
      accountId: dbUser.account.accountId,
      user: {
        userId: dbUser.userId,
        email: dbUser?.email,
        password: dbUser?.password,
        roles: dbUser?.roles.split(',').filter(x => x !== '').map(x => MySQLRole.getKeyByValue(x))
      },
      personalData: {
        birthDate: dbUser.account.birthDate,
        firstName: dbUser.account.firstName,
        lastName: dbUser.account.lastName,
        occupation: dbUser.account.occupation
      },
      creationDate: dbUser.account.createdAt,
      updateDate: dbUser.account.updatedAt,
      isActive: dbUser.account.isActive
    }
  }

  async insert (account: Account): Promise<void> {
    await this.accountRepo.save({
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
        roles: account.user.roles.map(role => MySQLRole.getValueByKey(role.name)).join(',')
      }
    })
  }

  async update (account: Account): Promise<void> {
    await this.accountRepo.update({
      accountId: account.accountId
    },
    {
      birthDate: account.personalData.birthDate,
      updatedAt: account.updateDate,
      firstName: account.personalData.firstName,
      lastName: account.personalData.lastName,
      isActive: account.isActive,
      occupation: account.personalData.occupation
    })
    await this.userRepo.update({
      userId: account.user.userId
    }, {
      password: account.user.password,
      roles: account.user.roles.map(role => MySQLRole.getValueByKey(role.name)).join(',')
    })
  }
}
