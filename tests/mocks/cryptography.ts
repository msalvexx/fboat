import { Cryptography, TokenGenerator } from '@/iam/domain/protocols'

export class CryptographyMock implements Cryptography {
  compareResult: boolean = true
  generateResult: string = 'validToken'

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return this.compareResult
  }

  async generate (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.generateResult
  }
}
