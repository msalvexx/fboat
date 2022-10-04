import { AccountService, AuthenticationService } from '@/server/iam/service'
import { MySQLAccountRepository } from '@/server/iam/infra/repositories'
import { BcryptAdapter, JwtAdapter, UiAvatarPhotoProvider } from '@/server/iam/infra/gateways'
import { Controller } from '@/server/shared/protocols/controller'

import { EnvConfig } from '@/server/main/configs/env'
import { ControllerBuilder } from './controller-builder'

const makeAccountRepository = (): MySQLAccountRepository => new MySQLAccountRepository()
const makeBcryptAdapter = (): BcryptAdapter => new BcryptAdapter(EnvConfig.getInstance().configs.bcrypt.salt)
const makeJwtAdapter = (): JwtAdapter => new JwtAdapter(
  EnvConfig.getInstance().configs.jwt.secret,
  EnvConfig.getInstance().configs.jwt.expiresIn
)
const makeAvatarProvider = (): UiAvatarPhotoProvider => new UiAvatarPhotoProvider()
const makeAccountService = (): AccountService => new AccountService(
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
    .privateService()
    .service(service.getAccount)
}

export const makeCreateAccount = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .privateService()
    .authorization('CreateAccount')
    .onSuccess(201)
    .service(service.createAccount)
}

export const makeChangeAccount = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .privateService()
    .authorization('ChangeAccount')
    .onSuccess(204)
    .service(service.changeAccount)
}

export const makeChangePassword = (): Controller => {
  const service = makeAccountService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .privateService()
    .authorization('ChangePassword')
    .onSuccess(204)
    .service(service.changePassword)
}

export const makeListAccounts = (): Controller => {
  const repository = makeAccountRepository()
  return ControllerBuilder
    .of(repository)
    .tokenCertifier()
    .privateService()
    .authorization('ListAccounts')
    .service(repository.fetchPage)
}
