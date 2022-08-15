import { Account } from '@/iam'

export namespace GetAccountByEmailRepository {
  export type Params = string
  export type Result = Account.Params | undefined
}

export namespace SaveAccountRepository {
  export type Params = Account
  export type Result = void
}

export namespace GetAccountByAccountId {
  export type Params = string
  export type Result = Account.Params | undefined
}

export interface SaveAccountRepository {
  insert: (account: SaveAccountRepository.Params) => Promise<SaveAccountRepository.Result>
  update: (account: SaveAccountRepository.Params) => Promise<SaveAccountRepository.Result>
}

export interface GetAccountByEmailRepository {
  getByEmail: (email: GetAccountByEmailRepository.Params) => Promise<GetAccountByEmailRepository.Result>
}

export interface GetAccountByAccountId {
  getByAccountId: (accountId: GetAccountByAccountId.Params) => Promise<GetAccountByAccountId.Result>
}

export type AccountRepository = SaveAccountRepository & GetAccountByEmailRepository & GetAccountByAccountId
