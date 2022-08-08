import { Cryptography, TokenGenerator, TokenVerifier } from '@/iam/domain/protocols'

export class CryptographyMock implements Cryptography {
  generateTokenResult: string = 'validToken'
  verifyResult = {
    accountId: '123',
    userId: '123',
    email: 'valid@mail.com'
  }

  async generate (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.generateTokenResult
  }

  async verify (params: TokenVerifier.Params): Promise<TokenVerifier.Result> {
    if (params === 'invalidToken') throw new Error()
    return this.verifyResult
  }
}
