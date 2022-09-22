import * as Pages from '@/client/presentation/pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import React from 'react'
import { setupValidator } from '@/client/main/factories'
import * as Schemas from '@fboat/core/iam/schemas'

const Router: React.FC = () => (
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Pages.Home/>} />
        <Route path='/login' element={<Pages.Login validator={setupValidator(Schemas.loginBodySchema)}/>} />
        <Route path='/article/:slugOrId' element={<Pages.ViewArticle />} />
        <Route path='/article/new' element={<Pages.EditArticle />} />
        <Route path='/article/:slugOrId/edit' element={<Pages.EditArticle />} />
        <Route path='/my-articles' element={<Pages.MyArticles />} />
        <Route path='/my-account' element={<Pages.EditAccount />} />
        <Route path='/account/new' element={<Pages.EditAccount />} />
        <Route path='/account/:accountId/edit' element={<Pages.EditAccount />} />
        <Route path='/list-accounts' element={<Pages.ListAccounts />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
)

export default Router
