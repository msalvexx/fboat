export namespace AuthenticateUser {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    personName: string
    accountId: string
    token: string
  } | Error
}

export interface AuthenticateUser {
  authenticate: (params: AuthenticateUser.Params) => Promise<AuthenticateUser.Result>
}
