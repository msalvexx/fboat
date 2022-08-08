export interface HashComparer {
  compare: (plaintext: string, digest: string) => Promise<boolean>
}

export interface HashGenerator {
  generate: (rawText: string) => Promise<string>
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
  generateToken: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

export type Hasher = HashComparer & HashGenerator
export type Cryptography = TokenGenerator
