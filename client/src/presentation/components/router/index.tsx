import * as Pages from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Pages.Home/>} />
      <Route path='/login' element={<Pages.Login/>} />
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
)

export default Router
