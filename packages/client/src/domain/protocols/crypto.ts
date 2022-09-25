export namespace TokenVerifier {
  export type Params = string

  export type Result = {
    accountId: string
    userId: string
    email: string
    roles: string[]
  }
}

export interface TokenVerifier {
  verify: (params: TokenVerifier.Params) => TokenVerifier.Result
}
