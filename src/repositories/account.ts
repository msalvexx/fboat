import { Account, GetAccountByEmailRepository, User } from '@/iam'
import { MySQLUser } from '@/repositories/entities'
import { MySQLConnectionManager } from './mysql-connection-manager'

import { ObjectType, Repository } from 'typeorm'

export class MySQLAccountRepository implements GetAccountByEmailRepository {
  constructor (private readonly connection: MySQLConnectionManager) {}

  async getByEmail (email: string): Promise<GetAccountByEmailRepository.Result> {
    const repository = this.getRepository(MySQLUser)
    const dbUser = await repository.findOne({ where: { email } })
    let account: Account | undefined
    if (dbUser !== null) {
      const user = new User(dbUser.userId, dbUser?.email, dbUser?.password)
      account = new Account(dbUser.account.accountId, user, {
        birthDate: dbUser.account.birthDate,
        firstName: dbUser.account.firstName,
        lastName: dbUser.account.lastName,
        occupation: dbUser.account.occupation
      })
    }
    return account
  }

  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
