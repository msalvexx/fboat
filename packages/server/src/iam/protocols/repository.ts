import { Account } from '@fboat/core'

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

export namespace ListAccountsRepository {
  export type Page = { size: number, number: number }

  export type Params = Partial<{
    pageSize: number
    pageNumber: number
  }>

  export type Result = {
    items: Array<Partial<Account.Params>>
    page: Page
  }

  export const Default = {
    pageNumber: 1,
    pageSize: 10
  }
}

export interface ListAccountsRepository {
  fetchPage: (params: ListAccountsRepository.Params) => Promise<ListAccountsRepository.Result>
}

export type AccountRepository = SaveAccountRepository & GetAccountByEmailRepository & GetAccountByAccountId
