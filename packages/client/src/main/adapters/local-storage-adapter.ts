import { makeGetLoggedAccountInformationApi, makeJwtDecrypter, makeLocalStorageAdapter } from '@/client/main/factories'
import { AccountCredentials } from '@/client/domain'
import { Account, Permission, User } from '@fboat/core'

export const setCurrentAccountAdapter = (account: AccountCredentials): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountCredentials => {
  return makeLocalStorageAdapter().get('account')
}

export const getAccountInformationAdapter = async (): Promise<Account> => {
  const handler = makeGetLoggedAccountInformationApi()
  return await handler({})
}

export const getToken = (): string | null => {
  const credentials = getCurrentAccountAdapter()
  if (!credentials) return null
  const token = credentials.token
  try {
    makeJwtDecrypter().verify(token)
    return token
  } catch (e) {
    setCurrentAccountAdapter(null)
  }
  return credentials?.token
}

export const getLoggedAccountId = (): string | null => {
  const token = getToken()
  if (!token) return null
  const { accountId } = makeJwtDecrypter().verify(token)
  return accountId
}

export const permissionVerifierAdapter = (permission: Permission): boolean => {
  const token = getToken()
  if (!token) return false
  const { userId, email, roles } = makeJwtDecrypter().verify(token)
  const user = new User({ userId, email, roles })
  return user.hasPermission(permission)
}

