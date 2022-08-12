import { AccountModifier, GetAccount } from '@/iam'
import { BcryptAdapter, JwtAdapter } from '@/iam/infra/adapters'
import { AccountService, AuthenticationService } from '@/iam/service'
import { Configs } from '@/application/configs/env'
import { makeAccountRepository } from '@/application/factories'

type Service = AccountModifier & GetAccount

const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(Configs.bcrypt.salt)
const makeJwtAdapter = (): JwtAdapter => new JwtAdapter(Configs.jwt.secret)

export const makeAccountService = (): Service => new AccountService(
  makeAccountRepository(),
  makeBcryptAdapter()
)

export const makeAuthenticationService = (): AuthenticationService => new AuthenticationService(
  makeAccountRepository(),
  makeJwtAdapter(),
  makeBcryptAdapter()
)
