import { TokenGenerator } from '@/iam/domain/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generate (params: TokenGenerator.Params): Promise<string> {
    return jwt.sign(params, this.secret)
  }
}
