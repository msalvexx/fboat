import { Account, PersonalData } from '@/iam/domain/model'

export namespace CreateAccount {
  export type Params = {
    email: string
    password: string
    personalData: PersonalData.Params
    roles: string[]
  }

  export type Result = Account.Params
}

export interface CreateAccount {
  createAccount: (params: CreateAccount.Params) => Promise<CreateAccount.Result>
}
