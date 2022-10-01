import { makeGetLoggedAccountInformationApi, makeJwtDecrypter, makeLocalStorageAdapter } from '@/client/main/factories'
import { AccountCredentials, TokenVerifier } from '@/client/domain'
import { Account, Permission, User } from '@fboat/core'

export const setCurrentAccountAdapter = (account: AccountCredentials): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountCredentials | null => {
  const credentials = makeLocalStorageAdapter().get('account')
  if (!credentials) return null
  try {
    makeJwtDecrypter().verify(credentials.token)
    return credentials
  } catch (e) {
    setCurrentAccountAdapter(null)
    return null
  }
}

export const getAccountInformationAdapter = async (): Promise<Account> => {
  const handler = makeGetLoggedAccountInformationApi()
  return await handler({})
}

export const getToken = (): string | null => {
  const credentials = getCurrentAccountAdapter()
  return credentials?.token
}

export const getLoggedAccountId = (): string | null => {
  const token = getToken()
  if (!token) return null
  try {
    const { accountId } = makeJwtDecrypter().verify(token)
    return accountId
  } catch {
    return null
  }
}

export const permissionVerifierAdapter = (permission: Permission): boolean => {
  const token = getToken()
  if (!token) return false
  try {
    const { userId, email, roles } = makeJwtDecrypter().verify(token)
    const user = new User({ userId, email, roles })
    return user.hasPermission(permission)
  } catch {
    return false
  }
}

