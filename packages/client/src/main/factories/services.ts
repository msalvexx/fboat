import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { Handler } from '@/client/domain'
import { HttpResourceHandlerBuilder } from './http-resource-builder'

export const getApiUrl = (path: string): string => `${process.env.API_URL}${path}`

export const makeAuthenticationService = (): Handler<AuthenticateUser.Result> => {
  return HttpResourceHandlerBuilder
    .resource<AuthenticateUser.Result>({
      method: 'post',
      url: getApiUrl('/login')
    })
    .unauthorized()
    .getHandler()
}
