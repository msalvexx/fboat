import { AccountModifier, GetAccount } from '@/iam/domain/protocols'
import { AccountService, AuthenticationService } from '@/iam/service'
import { MySQLAccountRepository } from '@/iam/infra/repositories'
import { BcryptAdapter, JwtAdapter, UiAvatarPhotoProvider } from '@/iam/infra/gateways'
import { Controller } from '@/shared/domain/protocols/controller'

import { EnvConfig } from '@/main/configs/env'
import { ControllerBuilder } from './controller-builder'

type Service = AccountModifier & GetAccount

const makeAccountRepository = (): MySQLAccountRepository => new MySQLAccountRepository()
const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(EnvConfig.getInstance().configs.bcrypt.salt)
const makeJwtAdapter = (): JwtAdapter => new JwtAdapter(
  EnvConfig.getInstance().configs.jwt.secret,
  EnvConfig.getInstance().configs.jwt.expiresIn
)
const makeAvatarProvider = (): UiAvatarPhotoProvider => new UiAvatarPhotoProvider()
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

export const makeLogin = (): Controller => {
  const service = makeAuthenticationService()
  return ControllerBuilder
    .of(service)
    .service(service.authenticate)
}

export const makeGetAccount = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .service(service.getAccount)
}

export const makeCreateAccount = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('CreateAccount')
    .onSuccess(201)
    .service(service.createAccount)
}

export const makeChangeAccount = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('ChangeAccount')
    .onSuccess(204)
    .service(service.changeAccount)
}

export const makeChangePassword = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('ChangePassword')
    .onSuccess(204)
    .service(service.changePassword)
}
