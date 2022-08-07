import { Account } from '@/iam'

export namespace GetAccountByEmailRepository {
  export type Params = string
  export type Result = Account | Error
}

export namespace SaveAccountRepository {
  export type Params = Account
  export type Result = boolean
}

export interface AccountRepository {
  save: (account: SaveAccountRepository.Params) => Promise<SaveAccountRepository.Result>
  getByEmail: (email: GetAccountByEmailRepository.Params) => Promise<GetAccountByEmailRepository.Result>
}
