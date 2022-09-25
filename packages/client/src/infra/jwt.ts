import { TokenVerifier } from '@/client/domain/protocols'

import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenVerifier {
  constructor (
    private readonly secret: string
  ) {}

  verify (params: string): TokenVerifier.Result {
    return jwt.verify(params, this.secret) as any
  }
}
