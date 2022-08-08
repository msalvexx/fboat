import { Cryptography, TokenGenerator, TokenVerifier } from '@/iam/domain/protocols'

export class CryptographyMock implements Cryptography {
  generateTokenResult: string = 'validToken'
  verifyResult: any

  async generate (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.generateTokenResult
  }

  async verify (params: TokenVerifier.Params): Promise<TokenVerifier.Result> {
    if (!this.verifyResult) throw new Error()
    return this.verifyResult
  }
}
