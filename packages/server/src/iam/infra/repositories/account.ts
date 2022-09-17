import { GetAccountByAccountId, GetAccountByEmailRepository, ListAccountsRepository, SaveAccountRepository } from '@/server/iam/protocols'
import { MySQLAccount, MySQLUser } from '@/server/iam/infra/repositories/entities'
import { MySQLConnectionManager } from '@/server/shared/infra'

import { Repository } from 'typeorm'
import { MySQLRole } from './entities/MySQLRole'

export class MySQLAccountRepository implements GetAccountByEmailRepository, SaveAccountRepository, GetAccountByAccountId, ListAccountsRepository {
  private readonly userRepo: Repository<MySQLUser>
  private readonly accountRepo: Repository<MySQLAccount>

  constructor (readonly connection: MySQLConnectionManager = MySQLConnectionManager.getInstance()) {
    this.userRepo = connection.getRepository(MySQLUser)
    this.accountRepo = connection.getRepository(MySQLAccount)
  }

  async fetchPage ({ pageSize, pageNumber }: ListAccountsRepository.Params): Promise<ListAccountsRepository.Result> {
    const size = pageSize ?? ListAccountsRepository.Default.pageSize
    const number = pageNumber ?? ListAccountsRepository.Default.pageNumber
    const accounts = await this.accountRepo.find({
      order: { firstName: 'asc' },
      relations: { user: true },
      take: size,
      skip: number - 1
    })
    return {
      items: accounts.map(x => ({
        accountId: x.accountId,
        isActive: x.isActive,
        creationDate: x.createdAt,
        personalData: {
          firstName: x.firstName,
          lastName: x.lastName,
          photo: x.photo,
          occupation: x.occupation,
          birthDate: x.birthDate
        },
        user: {
          userId: x.user.userId,
          email: x.user.email,
          roles: x.user.roles.split(',').filter(x => x !== '').map(x => MySQLRole.getKeyByValue(x))
        }
      })),
      page: { number, size }
    }
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
        photo: dbAccount.photo,
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
        photo: dbUser.account.photo,
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

  async insert (account: SaveAccountRepository.Params): Promise<void> {
    await this.accountRepo.save({
      accountId: account.accountId,
      birthDate: account.personalData.birthDate,
      createdAt: account.creationDate,
      updatedAt: account.updateDate,
      firstName: account.personalData.firstName,
      photo: account.personalData.photo,
      isActive: account.isActive,
      lastName: account.personalData.lastName,
      occupation: account.personalData.occupation,
      user: {
        userId: account.user.userId,
        email: account.user.email,
        password: account.user.password,
        roles: account.user.roles.map((role: { name: string}) => MySQLRole.getValueByKey(role.name)).join(',')
      }
    })
  }

  async update (account: SaveAccountRepository.Params): Promise<void> {
    await this.accountRepo.update({
      accountId: account.accountId
    },
    {
      birthDate: account.personalData.birthDate,
      updatedAt: account.updateDate,
      photo: account.personalData.photo,
      firstName: account.personalData.firstName,
      lastName: account.personalData.lastName,
      isActive: account.isActive,
      occupation: account.personalData.occupation
    })
    await this.userRepo.update({
      userId: account.user.userId
    }, {
      password: account.user.password,
      roles: account.user.roles.map((role: { name: string }) => MySQLRole.getValueByKey(role.name)).join(',')
    })
  }
}
