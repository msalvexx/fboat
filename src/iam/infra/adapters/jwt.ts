import { Cryptography, TokenGenerator, TokenVerifier } from '@/iam/domain/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Cryptography {
  constructor (private readonly secret: string) {}

  async generate (params: TokenGenerator.Params): Promise<string> {
    return jwt.sign(params, this.secret)
  }

  async verify (params: string): Promise<TokenVerifier.Result> {
    return jwt.verify(params, this.secret) as any
  }
}