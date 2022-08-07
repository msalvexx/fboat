import { Account } from '@/iam'

export namespace CreateAccount {
  export type Params = {
    email: string
    firstName: string
    lastName: string
    password: string
    occupation: string
    birthDate: Date
  }

  export type Result = Account
}

export interface CreateAccount {
  create: (params: CreateAccount.Params) => Promise<CreateAccount.Result>
}
