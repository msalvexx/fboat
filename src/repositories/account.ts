import { Account, GetAccountByEmailRepository, SaveAccountRepository, User } from '@/iam'
import { MySQLAccount, MySQLUser } from '@/repositories/entities'
import { MySQLConnectionManager } from './mysql-connection-manager'

import { Repository } from 'typeorm'

export class MySQLAccountRepository implements GetAccountByEmailRepository, SaveAccountRepository {
  private readonly userRepo: Repository<MySQLUser>
  private readonly accountRepo: Repository<MySQLAccount>

  constructor (private readonly connection: MySQLConnectionManager) {
    this.userRepo = connection.getRepository(MySQLUser)
    this.accountRepo = connection.getRepository(MySQLAccount)
  }

  async getByEmail (email: string): Promise<GetAccountByEmailRepository.Result> {
    const dbUser = await this.userRepo.findOne({ where: { email } })
    let account: Account | undefined
    if (dbUser !== null) {
      const user = new User(dbUser.userId, dbUser?.email, dbUser?.password)
      const personalData = {
        birthDate: dbUser.account.birthDate,
        firstName: dbUser.account.firstName,
        lastName: dbUser.account.lastName,
        occupation: dbUser.account.occupation
      }
      account = new Account(dbUser.account.accountId, user, personalData, dbUser.account.createdAt, dbUser.account.updatedAt)
    }
    return account
  }

  async save (account: Account): Promise<void> {
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
        email: account.user.email,
        password: account.user.password,
        userId: account.user.userId
      }
    })
  }
}
