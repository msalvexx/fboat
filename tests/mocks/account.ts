import { Account, User, GetAccountByEmailRepository, PersistDataChangeError } from '@/iam'
import { AccountRepository, SaveAccountRepository } from '@/iam/domain/protocols'

export function mockUser (userId: string = '123', email: string = 'valid@mail.com', password: string = '123'): User {
  return new User(userId, email, password)
}

export function mockAccount (email: string = 'valid@mail.com', password: string = '123', userId: string = '123'): Account {
  const user = mockUser(userId, email, password)
  const personalData = {
    firstName: 'any',
    lastName: 'any',
    occupation: 'any',
    birthDate: new Date()
  }
  return new Account('123', user, personalData)
}

export class AccountRepositoryMock implements AccountRepository {
  account: Account
  readResult: any = undefined
  saveResult: boolean = true
  saveCalls: number = 0

  async save (account: SaveAccountRepository.Params): Promise<SaveAccountRepository.Result> {
    this.account = account
    if (!this.saveResult) throw new PersistDataChangeError(account.constructor.name)
  }

  async getByEmail (email: string): Promise<GetAccountByEmailRepository.Result> {
    return this.readResult
  }
}
