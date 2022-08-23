import { AccountModifier, GetAccount } from '@/iam/domain/protocols'
import { AccountService, AuthenticationService } from '@/iam/service'
import { MySQLAccountRepository } from '@/iam/infra/repositories'
import { BcryptAdapter, JwtAdapter, UiAvatarPhotoProvider } from '@/iam/infra/gateways'
import { AxiosHttpClient } from '@/shared/infra/gateways'
import { Handler } from '@/shared/domain/protocols/middleware'

import { EnvConfig } from '@/main/configs/env'
import { HandlerBuilder } from './builder'

type Service = AccountModifier & GetAccount

const makeAccountRepository = (): MySQLAccountRepository => new MySQLAccountRepository()
const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(EnvConfig.getInstance().configs.bcrypt.salt)
const makeJwtAdapter = (): JwtAdapter => new JwtAdapter(
  EnvConfig.getInstance().configs.jwt.secret,
  EnvConfig.getInstance().configs.jwt.expiresIn
)
const makeHttpClient = (): AxiosHttpClient => new AxiosHttpClient()
const makeAvatarProvider = (): UiAvatarPhotoProvider => new UiAvatarPhotoProvider(makeHttpClient())
const makeAccountService = (): Service => new AccountService(
  makeAccountRepository(),
  makeBcryptAdapter(),
  makeAvatarProvider()
)

export const makeAuthenticationService = (): AuthenticationService => new AuthenticationService(
  makeAccountRepository(),
  makeJwtAdapter(),
  makeBcryptAdapter()
)

export const makeLogin = (): Handler => {
  const service = makeAuthenticationService()
  return HandlerBuilder
    .of(service)
    .service(service.authenticate)
}

export const makeGetAccount = (): Handler => {
  const service = makeAccountService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .service(service.getAccount)
}

export const makeCreateAccount = (): Handler => {
  const service = makeAccountService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('CreateAccount')
    .service(service.createAccount)
}

export const makeChangeAccount = (): Handler => {
  const service = makeAccountService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('ChangeAccount')
    .service(service.changeAccount)
}

export const makeChangePassword = (): Handler => {
  const service = makeAccountService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('ChangePassword')
    .service(service.changePassword)
}
