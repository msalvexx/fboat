import * as Pages from '@/presentation/pages'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@/presentation/styles/global.scss'

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Pages.Login/>} />
      <Route path='/article/:slugOrId' element={<Pages.ViewArticle />} />
    </Routes>
  </BrowserRouter>
)

export default Router
