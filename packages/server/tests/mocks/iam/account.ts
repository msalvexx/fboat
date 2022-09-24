import { Account, PersistDataChangeError } from '@fboat/core/iam/models'
import { GetAccountByEmailRepository, AccountRepository, GetAccountByAccountId, SaveAccountRepository } from '@/server/iam/protocols'
import { MockUserParams, defaultUser, mockUserParams } from './user'

type MockAccountParams = {
  accountId?: string
  personalData?: {
    photo?: string | null | undefined
    firstName?: string
    lastName?: string
    occupation?: string
    birthDate?: Date
  }
  user?: MockUserParams
}

const defaultAccount: MockAccountParams = {
  accountId: '123',
  personalData: {
    photo: null,
    firstName: 'any',
    lastName: 'any',
    occupation: 'any',
    birthDate: new Date()
  },
  user: defaultUser
}

export const mockAccount = (params: MockAccountParams = defaultAccount): Account => {
  const accountId: any = params.accountId ?? defaultAccount.accountId
  const personalData: any = params.personalData ?? defaultAccount.personalData
  const user: any = mockUserParams(params.user) ?? defaultAccount.user
  return new Account({ accountId, personalData, user })
}

export class AccountRepositoryMock implements AccountRepository {
  updateAccount: Account
  insertAccount: Account
  readResult = undefined
  insertResult = true
  updateResult = true
  readByAccountIdResult = undefined

  async insert (account: SaveAccountRepository.Params): Promise<SaveAccountRepository.Result> {
    this.insertAccount = account
    if (!this.insertResult) throw new PersistDataChangeError(account.constructor.name)
  }

  async update (account: SaveAccountRepository.Params): Promise<SaveAccountRepository.Result> {
    this.updateAccount = account
    if (!this.updateResult) throw new PersistDataChangeError(account.constructor.name)
  }

  async getByEmail (email: string): Promise<GetAccountByEmailRepository.Result> {
    return this.readResult
  }

  async getByAccountId (accountId: string): Promise<GetAccountByAccountId.Result> {
    return this.readByAccountIdResult
  }
}
