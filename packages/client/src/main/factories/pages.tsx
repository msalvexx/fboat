import React from 'react'
import * as Pages from '@/client/presentation/pages'
import * as IamSchemas from '@fboat/core/iam/schemas'
import * as ContentSystemSchemas from '@fboat/core/content-system/schemas'

import { setupValidator } from './validator'
import { makeAuthenticationApi, makeChangeArticleApi, makeCreateArticleApi, makeGetArticleApi, makeGetArticlesApi, makeUploadImageApi } from './api'
import { useParams } from 'react-router-dom'

type AccountId = { slugOrId: string }

export const Login: React.FC<any> = () => <Pages.Login
  authenticate={makeAuthenticationApi()}
  validator={setupValidator(IamSchemas.loginBodySchema)}
/>

export const Home: React.FC<any> = () => <Pages.Home/>

export const ViewArticle: React.FC<any> = () => {
  const { slugOrId } = useParams<AccountId>()
  return <Pages.ViewArticle loadArticle={makeGetArticleApi(slugOrId, { isPublished: true })} loadRelated={(makeGetArticlesApi())} />
}

export const EditArticle: React.FC<any> = () => {
  const { slugOrId } = useParams<AccountId>()
  const schema = slugOrId ? ContentSystemSchemas.createArticle.without(['coverPhoto']) : ContentSystemSchemas.createArticle
  const saveArticle = slugOrId ? makeChangeArticleApi(slugOrId) : makeCreateArticleApi()
  const loadArticle = slugOrId ? makeGetArticleApi(slugOrId) : undefined
  const uploadImage = makeUploadImageApi()
  return <Pages.EditArticle
    saveArticle={saveArticle}
    loadArticle={loadArticle}
    uploadImage={uploadImage}
    validator={setupValidator(schema)} />
}

export const MyArticles: React.FC<any> = () => <Pages.MyArticles />
export const EditAccount: React.FC<any> = () => <Pages.EditAccount />
export const ListAccounts: React.FC<any> = () => <Pages.ListAccounts />
export const NotFound: React.FC<any> = () => <Pages.Error title='404' message='Página não encontrada' />
