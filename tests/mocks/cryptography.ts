import { Cryptography, TokenGenerator } from '@/iam/domain/protocols'

export class CryptographyMock implements Cryptography {
  compareResult: boolean = true
  generateTokenResult: string = 'validToken'
  generateHashResult: string = 'hashedPassword'

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return this.compareResult
  }

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.generateTokenResult
  }

  async generateHash (params: string): Promise<string> {
    return this.generateHashResult
  }
}
