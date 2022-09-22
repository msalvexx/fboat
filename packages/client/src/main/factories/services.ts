import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { Authentication } from '@/client/domain/services'
import { makeAxiosHttpClient } from './infra'

export const getApiUrl = (path: string): string => `${process.env.API_URL}${path}`

export const makeAuthenticationService = (): AuthenticateUser => {
  return new Authentication(getApiUrl('/login'), makeAxiosHttpClient())
}
