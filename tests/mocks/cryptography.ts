import { Cryptography, TokenGenerator } from '@/iam/domain/protocols'

export class CryptographyMock implements Cryptography {
  generateTokenResult: string = 'validToken'

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.generateTokenResult
  }
}
