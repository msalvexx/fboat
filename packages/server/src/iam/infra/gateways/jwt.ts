import { Cryptography, TokenGenerator, TokenVerifier } from '@/server/iam/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements Cryptography {
  constructor (
    private readonly secret: string,
    private readonly expiresIn: string | number
  ) {}

  async generate (params: TokenGenerator.Params): Promise<string> {
    return jwt.sign(params, this.secret, { expiresIn: this.expiresIn })
  }

  async verify (params: string): Promise<TokenVerifier.Result> {
    return jwt.verify(params, this.secret) as any
  }
}
