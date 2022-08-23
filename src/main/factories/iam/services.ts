import { AccountModifier, GetAccount } from '@/iam'
import { BcryptAdapter, JwtAdapter, UiAvatarPhotoProvider } from '@/iam/infra/adapters'
import { AccountService, AuthenticationService } from '@/iam/service'

import { EnvConfig } from '@/main/configs/env'
import { makeAccountRepository } from '@/main/factories'
import { AxiosHttpClient } from '@/shared/infra/adapters'

type Service = AccountModifier & GetAccount

const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(EnvConfig.getInstance().configs.bcrypt.salt)
const makeJwtAdapter = (): JwtAdapter => new JwtAdapter(
  EnvConfig.getInstance().configs.jwt.secret,
  EnvConfig.getInstance().configs.jwt.expiresIn
)
const makeHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
const makeAvatarProvider = (): UiAvatarPhotoProvider => new UiAvatarPhotoProvider(makeHttpClient())

export const makeAccountService = (): Service => new AccountService(
  makeAccountRepository(),
  makeBcryptAdapter(),
  makeAvatarProvider()
)

export const makeAuthenticationService = (): AuthenticationService => new AuthenticationService(
  makeAccountRepository(),
  makeJwtAdapter(),
  makeBcryptAdapter()
)
