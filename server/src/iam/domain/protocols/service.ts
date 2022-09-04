import { Account } from '@/iam/domain/model'
import { CreateAccount, ChangeAccount, ChangePassword } from '.'

export namespace GetAccount {
  export type Params = { accountId: string }
  export type Result = Account.Params
}

export interface GetAccount {
  getAccount: (params: GetAccount.Params) => Promise<GetAccount.Result>
}

export type AccountModifier = CreateAccount & ChangeAccount & ChangePassword
