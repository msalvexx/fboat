import { Account, User, GetAccountByEmailRepository, PersistDataChangeError } from '@/iam'
import { AccountRepository, SaveAccountRepository } from '@/iam/domain/protocols'

type UserParams = {
  userId?: string
  email?: string
  password?: string
}
const defaultUser: UserParams = { userId: '123', email: 'valid@mail.com', password: '123' }
export const mockUser = (params: UserParams = defaultUser): User => {
  const userId: any = params.userId ?? defaultUser.userId
  const email: any = params.email ?? defaultUser.email
  const password: any = params.password ?? defaultUser.password
  return new User({ userId, email, password })
}

type AccountParams = {
  accountId?: string
  personalData?: {
    firstName?: string
    lastName?: string
    occupation?: string
    birthDate?: Date
  }
  user?: UserParams
}

const defaultAccount: AccountParams = {
  accountId: '123',
  personalData: {
    firstName: 'any',
    lastName: 'any',
    occupation: 'any',
    birthDate: new Date()
  },
  user: defaultUser
}
export const mockAccount = (params: AccountParams = defaultAccount): Account => {
  const accountId: any = params.accountId ?? defaultAccount.accountId
  const personalData: any = params.personalData ?? defaultAccount.personalData
  const user: any = params.user ?? defaultAccount.user
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
