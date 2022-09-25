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
    roles: string[]
  }

  export type Result = string
}

export interface TokenGenerator {
  generate: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

export namespace TokenVerifier {
  export type Params = string

  export type Result = {
    accountId: string
    userId: string
    email: string
  }
}

export interface TokenVerifier {
  verify: (params: TokenVerifier.Params) => Promise<TokenVerifier.Result>
}

export type Hasher = HashComparer & HashGenerator
export type Cryptography = TokenGenerator & TokenVerifier
