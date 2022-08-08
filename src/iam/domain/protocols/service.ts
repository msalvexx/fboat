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
  create: (params: CreateAccount.Params) => Promise<CreateAccount.Result>
}

export namespace ChangeAccount {
  export type Params = {
    email: string
    roles: string[]
    personalData: PersonalData.Params
    isActive: boolean
  }

  export type Result = undefined | Error
}

export interface ChangeAccount {
  change: (params: ChangeAccount.Params) => Promise<ChangeAccount.Result>
}

export namespace ChangePassword {
  export type Params = {
    email: string
    oldPassword: string
    newPassword: string
  }

  export type Result = undefined | Error
}

export interface ChangePassword {
  change: (params: ChangePassword.Params) => Promise<ChangePassword.Result>
}

export type AccountModifier = CreateAccount & ChangeAccount
