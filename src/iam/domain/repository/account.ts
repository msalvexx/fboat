import { Account } from '@/iam'

export namespace GetAccountByEmail {
  export type Params = string
  export type Result = Promise<Account>
}

export interface GetAccountByEmailRepository {
  getByEmail: (email: GetAccountByEmail.Params) => GetAccountByEmail.Result
}

export namespace SaveAccountRepository {
  export type Params = Account
  export type Result = Promise<boolean>
}

export interface SaveAccountRepository {
  save: (account: SaveAccountRepository.Params) => SaveAccountRepository.Result
}
