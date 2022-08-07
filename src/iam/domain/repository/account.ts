import { Account } from '@/iam'

export namespace GetAccountByEmail {
  export type Params = string
  export type Result = Account | Error
}

export interface GetAccountByEmailRepository {
  getByEmail: (email: GetAccountByEmail.Params) => Promise<GetAccountByEmail.Result>
}

export namespace SaveAccountRepository {
  export type Params = Account
  export type Result = boolean
}

export interface SaveAccountRepository {
  save: (account: SaveAccountRepository.Params) => Promise<SaveAccountRepository.Result>
}
