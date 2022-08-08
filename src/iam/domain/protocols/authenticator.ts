import { Account } from '@/iam'

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

export namespace AuthenticationCertifier {
  export type Params = string

  export type Result = Account | Error
}

export interface AuthenticationCertifier {
  certicate: (token: AuthenticationCertifier.Params) => Promise<AuthenticationCertifier.Result>
}

export type Authenticator = AuthenticateUser
