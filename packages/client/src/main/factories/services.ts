import { AuthenticateUser, GetAccount } from '@fboat/core/iam/protocols'
import { Handler } from '@/client/domain'
import { HttpResourceHandlerBuilder } from './http-resource-builder'
import { makeJwtDecrypter } from './infra'
import { Account } from '@fboat/core'
import { getCurrentAccountAdapter } from '../adapters'

export const getApiUrl = (path: string): string => `${process.env.API_URL}${path}`

export const makeAuthenticationService = (): Handler<AuthenticateUser.Result> => {
  return HttpResourceHandlerBuilder
    .resource<AuthenticateUser.Result>({
      method: 'post',
      url: getApiUrl('/login')
    })
    .unauthorized()
    .build()
}

export const getToken = (): string | null => {
  const credentials = getCurrentAccountAdapter()
  return credentials?.token
}

export const makeGetLoggedAccountInformation = (): Handler<Account> => {
  const token = getToken()
  const { accountId } = makeJwtDecrypter().verify(token)
  return HttpResourceHandlerBuilder
    .resource<GetAccount.Result>({
      method: 'get',
      url: getApiUrl(`/account/${accountId}`),
      headers: { Authorization: token }
    })
    .unauthorized()
    .map(x => new Account(x))
    .build()
}

export const getAccountInformationAdapter = async (): Promise<Account> => {
  const handler = makeGetLoggedAccountInformation()
  return await handler({})
}
