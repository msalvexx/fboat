export namespace TokenGenerator {
  export type Params = {
    accountId: string
    userId: string
  }

  export type Result = string
}

export interface TokenGenerator {
  generate: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}
