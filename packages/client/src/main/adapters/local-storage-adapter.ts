import { makeLocalStorageAdapter } from '@/client/main/factories'
import { AccountCredentials } from '@/client/domain'

export const setCurrentAccountAdapter = (account: AccountCredentials): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountCredentials => {
  return makeLocalStorageAdapter().get('account')
}
