import { AuthenticateUser, GetAccount, Account, GetArticle, SaveAttachment } from '@fboat/core'
import { Article, Handler, HttpContentType } from '@/client/domain'
import { PageResult } from '@/client/domain/protocols/page'
import { getToken, getLoggedAccountId } from '@/client/main/adapters'

import { HttpResourceHandlerBuilder } from './http-resource-builder'

export const getApiUrl = (path: string): string => `${process.env.API_URL}${path}`

export const addAuthorization = (): any => ({ Authorization: getToken() })

export const makeAuthenticationApi = (): Handler<AuthenticateUser.Result> => {
  return HttpResourceHandlerBuilder
    .resource<AuthenticateUser.Result>({
    method: 'post',
    url: getApiUrl('/login')
  })
    .unauthorized()
    .map()
    .build()
}

export const makeGetLoggedAccountInformationApi = (): Handler<Account> => {
  return HttpResourceHandlerBuilder
    .resource<GetAccount.Result>({
    method: 'get',
    url: getApiUrl(`/account/${getLoggedAccountId()}`),
    headers: addAuthorization()
  })
    .unauthorized()
    .map(x => new Account(x))
    .build()
}

export const makeGetArticleApi = (slugOrId: string, params: any = {}): Handler<GetArticle.Result> => {
  return HttpResourceHandlerBuilder
    .resource<GetArticle.Result>({
    method: 'get',
    url: getApiUrl(`/article/${slugOrId}`),
    headers: addAuthorization(),
    params
  })
    .notFound()
    .map(x => ({
      ...x,
      creationDate: x.creationDate && new Date(x.creationDate),
      revisionDate: x.revisionDate && new Date(x.revisionDate),
      publishDate: x.publishDate && new Date(x.publishDate)
    }))
    .build()
}

export const makeGetArticlesApi = (): Handler<Article[]> => {
  return HttpResourceHandlerBuilder
    .resource<PageResult<Article>>({
    method: 'get',
    url: getApiUrl('/article')
  })
    .map(x => x.items.map(y => ({ ...y, publishDate: y.publishDate && new Date(y.publishDate) })))
    .build()
}

export const makeChangeArticleApi = (slugOrId: string): Handler<void> => {
  return HttpResourceHandlerBuilder
    .resource<void>({
    method: 'put',
    url: getApiUrl(`/article/${slugOrId}`),
    headers: addAuthorization()
  })
    .forbidden()
    .notFound()
    .unauthorized()
    .map()
    .build()
}

export const makeCreateArticleApi = (): Handler<void> => {
  return HttpResourceHandlerBuilder
    .resource<void>({
    method: 'post',
    url: getApiUrl('/article'),
    headers: addAuthorization(),
    body: {
      authorId: getLoggedAccountId()
    }
  })
    .forbidden()
    .notFound()
    .unauthorized()
    .map()
    .build()
}

export const makeUploadImageApi = (): Handler<SaveAttachment.Result> => {
  return HttpResourceHandlerBuilder
    .resource<SaveAttachment.Result>({
    method: 'post',
    url: getApiUrl('/attachment'),
    headers: {
      ...addAuthorization(),
      'Content-Type': HttpContentType.formData
    }
  })
    .forbidden()
    .notFound()
    .unauthorized()
    .map()
    .build()
}
