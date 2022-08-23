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

export namespace ChangeAccount {
  export type Params = {
    accountId: string
    roles: string[]
    personalData: PersonalData.Params
    isActive: boolean
  }

  export type Result = void
}

export interface ChangeAccount {
  changeAccount: (params: ChangeAccount.Params) => Promise<ChangeAccount.Result>
}

export namespace ChangePassword {
  export type Params = {
    accountId: string
    newPassword: string
  }

  export type Result = void
}

export interface ChangePassword {
  changePassword: (params: ChangePassword.Params) => Promise<ChangePassword.Result>
}

export namespace GetAccount {
  export type Params = { accountId: string }
  export type Result = Account.Params
}

export interface GetAccount {
  getAccount: (params: GetAccount.Params) => Promise<GetAccount.Result>
}

export type AccountModifier = CreateAccount & ChangeAccount & ChangePassword
