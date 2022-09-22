import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { makeLocalStorageAdapter } from '@/client/main/factories'

export const setCurrentAccountAdapter = (account: AuthenticateUser.Result): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AuthenticateUser.Result => {
  return makeLocalStorageAdapter().get('account')
}
