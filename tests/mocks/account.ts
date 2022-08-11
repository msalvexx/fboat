import { Account, GetAccountByEmailRepository, PersistDataChangeError } from '@/iam'
import { AccountRepository, SaveAccountRepository } from '@/iam/domain/protocols'
import { MockUserParams, defaultUser, mockUserParams } from './user'

type MockAccountParams = {
  accountId?: string
  personalData?: {
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
