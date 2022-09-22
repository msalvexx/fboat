import React from 'react'
import * as Pages from '@/client/presentation/pages'
import * as Schemas from '@fboat/core/iam/schemas'

import { setupValidator } from './validator'
import { makeAuthenticationService } from './services'

export const Login: React.FC<any> = () => <Pages.Login
  service={makeAuthenticationService()}
  validator={setupValidator(Schemas.loginBodySchema)}
/>
export const Home: React.FC<any> = () => <Pages.Home/>
export const ViewArticle: React.FC<any> = () => <Pages.ViewArticle />
export const EditArticle: React.FC<any> = () => <Pages.EditArticle />
export const MyArticles: React.FC<any> = () => <Pages.MyArticles />
export const EditAccount: React.FC<any> = () => <Pages.EditAccount />
export const ListAccounts: React.FC<any> = () => <Pages.ListAccounts />
