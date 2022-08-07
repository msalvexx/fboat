import { Account, EmailAlreadyInUseError, PersistDataChangeError, PersonalData } from '@/iam'

export namespace AuthenticateUser {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    personName: string
    token: string
  } | Error
}

export interface AuthenticateUser {
  authenticate: (params: AuthenticateUser.Params) => Promise<AuthenticateUser.Result>
}

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
  }

  export type Result = Promise<void> | Promise<Error>
}

export interface ChangeAccount {
  change: (params: ChangeAccount.Params) => Promise<ChangeAccount.Result>
}

export namespace ChangePassword {
  export type Params = {
    userId: string
    password: string
  }

  export type Result = boolean
}

export interface ChangePassword {
  change: (params: ChangePassword.Params) => Promise<ChangePassword.Result>
}

export type AccountServices = AuthenticateUser & CreateAccount & ChangeAccount
