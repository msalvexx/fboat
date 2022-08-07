export interface HashComparer {
  compare: (plaintext: string, digest: string) => Promise<boolean>
}

export namespace TokenGenerator {
  export type Params = {
    accountId: string
    userId: string
    email: string
  }

  export type Result = string
}

export interface TokenGenerator {
  generate: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

export type Cryptography = TokenGenerator & HashComparer