import { Account, User, AccountNotFoundError, GetAccountByEmailRepository } from '@/iam'
import { AccountRepository, SaveAccountRepository } from '@/iam/domain/protocols'

export function mockAccount (email: string = 'valid@mail.com', password: string = '123'): Account {
  const user = new User('123', email, password)
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
  readResult: any
  saveResult: boolean = true
  saveCalls: number = 0

  async save (account: SaveAccountRepository.Params): Promise<SaveAccountRepository.Result> {
    this.account = account
    return this.saveResult
  }

  async getByEmail (email: string): Promise<GetAccountByEmailRepository.Result> {
    if (!this.readResult) return new AccountNotFoundError(email)
    return this.readResult
  }
}
