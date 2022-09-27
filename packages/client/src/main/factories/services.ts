import { AuthenticateUser, GetAccount, Account, GetArticle, Permission, User } from '@fboat/core'
import { getCurrentAccountAdapter } from '@/client/main/adapters'
import { Article, Handler } from '@/client/domain'
import { HttpResourceHandlerBuilder } from './http-resource-builder'
import { makeJwtDecrypter } from './infra'
import { PageResult } from '@/client/domain/protocols/page'

export const getApiUrl = (path: string): string => `${process.env.API_URL}${path}`

export const makeAuthenticationService = (): Handler<AuthenticateUser.Result> => {
  return HttpResourceHandlerBuilder
    .resource<AuthenticateUser.Result>({
      method: 'post',
      url: getApiUrl('/login')
    })
    .unauthorized()
    .map()
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

export const makeGetArticle = (slugOrId: string): Handler<GetArticle.Result> => {
  return HttpResourceHandlerBuilder
    .resource<GetAccount.Result>({
      method: 'get',
      url: getApiUrl(`/article/${slugOrId}`)
    })
    .notFound()
    .map(x => ({
      ...x,
      creationDate: x.creationDate && new Date(x.creationDate),
      updateDate: x.updateDate && new Date(x.updateDate)
    }))
    .build()
}

export const makeGetArticles = (): Handler<Article[]> => {
  return HttpResourceHandlerBuilder
    .resource<PageResult<Article>>({
      method: 'get',
      url: getApiUrl('/article')
    })
    .map(x => x.items.map(y => ({ ...y, publishDate: y.publishDate && new Date(y.publishDate) })))
    .build()
}

export const getAccountInformationAdapter = async (): Promise<Account> => {
  const handler = makeGetLoggedAccountInformation()
  return await handler({})
}

export const permissionVerifierAdapter = (permission: Permission): boolean => {
  const token = getToken()
  if (!token) return false
  const { userId, email, roles } = makeJwtDecrypter().verify(token)
  const user = new User({ userId, email, roles })
  return user.hasPermission(permission)
}
