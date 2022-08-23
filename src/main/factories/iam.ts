import { AccountModifier, GetAccount } from '@/iam/domain/protocols'
import { AccountService, AuthenticationService } from '@/iam/service'
import { MySQLAccountRepository } from '@/iam/infra/repositories'
import { BcryptAdapter, JwtAdapter, UiAvatarPhotoProvider } from '@/iam/infra/gateways'
import { AxiosHttpClient } from '@/shared/infra/gateways'
import { Handler } from '@/shared/protocols/middleware'

import { EnvConfig } from '@/main/configs/env'
import { makeAuthorizationHandler, makeServiceHandler, makeTokenCertifierHandler } from '@/main/factories/shared'

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
  return makeServiceHandler(service.authenticate, service)
}

export const makeGetAccount = (): Handler => {
  const service = makeAccountService()
  const handler = makeTokenCertifierHandler()
  handler.setNext(makeServiceHandler(service.getAccount, service))
  return handler
}

export const makeCreateAccount = (): Handler => {
  const service = makeAccountService()
  const handler1 = makeTokenCertifierHandler()
  const handler2 = makeAuthorizationHandler('CreateAccount')
  const handler3 = makeServiceHandler(service.createAccount, service)
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  return handler1
}

export const makeChangeAccount = (): Handler => {
  const service = makeAccountService()
  const handler1 = makeTokenCertifierHandler()
  const handler2 = makeAuthorizationHandler('ChangeAccount')
  const handler3 = makeServiceHandler(service.changeAccount, service)
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  return handler1
}

export const makeChangePassword = (): Handler => {
  const service = makeAccountService()
  const handler1 = makeTokenCertifierHandler()
  const handler2 = makeAuthorizationHandler('ChangePassword')
  const handler3 = makeServiceHandler(service.changePassword, service)
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  return handler1
}
