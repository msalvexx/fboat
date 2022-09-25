import { Cryptography, TokenGenerator, TokenVerifier } from '@/server/iam/protocols'

export class CryptographyMock implements Cryptography {
  generateTokenResult = 'validToken'
  verifyResult = {
    accountId: '123',
    userId: '123',
    email: 'valid@mail.com',
    roles: ['Administrator']
  }

  async generate (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.generateTokenResult
  }

  async verify (params: TokenVerifier.Params): Promise<TokenVerifier.Result> {
    if (params === 'invalidToken') throw new Error()
    return this.verifyResult
  }
}
