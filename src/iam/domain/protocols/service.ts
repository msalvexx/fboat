import { Account, EmailAlreadyInUseError, PersistDataChangeError, PersonalData } from '@/iam'

export namespace CreateAccount {
  export type Params = {
    email: string
    firstName: string
    lastName: string
    password: string
    occupation: string
    birthDate: Date
  }

  export type Result = Account | EmailAlreadyInUseError | PersistDataChangeError
}

export interface CreateAccount {
  createAccount: (params: CreateAccount.Params) => Promise<CreateAccount.Result>
}

export namespace ChangeAccount {
  export type Params = {
    email: string
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
    email: string
    newPassword: string
  }

  export type Result = void
}

export interface ChangePassword {
  changePassword: (params: ChangePassword.Params) => Promise<ChangePassword.Result>
}

export namespace GetAccount {
  export type Params = string
  export type Result = Account
}

export interface GetAccount {
  getAccount: (email: GetAccount.Params) => Promise<GetAccount.Result>
}

export type AccountModifier = CreateAccount & ChangeAccount & ChangePassword
