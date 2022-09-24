import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import * as Pages from '@/client/main/factories'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/client/main/adapters'
import { currentAccountState } from '@/client/presentation/components'

export const Router: React.FC = () => {
  const state = {
    setCurrentAccountCredentials: setCurrentAccountAdapter,
    getCurrentAccountCredentials: getCurrentAccountAdapter,
    getCurrentAccount: () => ({ user: null }) as any
  }
  return <>
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Pages.Home />} />
          <Route path='/login' element={<Pages.Login />} />
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
  </>
}
