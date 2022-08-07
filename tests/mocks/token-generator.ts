import { TokenGenerator } from '@/iam/domain/protocols/token-generator'

export class TokenGeneratorMock implements TokenGenerator {
  result: string = 'validToken'

  async generate (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.result
  }
}
