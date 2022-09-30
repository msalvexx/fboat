import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import * as Pages from '@/client/main/factories'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/client/main/adapters'
import { currentAccountState } from '@/client/presentation/components'
import { permissionVerifierAdapter } from '@/client/main/factories'
import { Permission } from '@fboat/core'

const state = {
  setCurrentAccountCredentials: setCurrentAccountAdapter,
  getCurrentAccountCredentials: getCurrentAccountAdapter,
  hasPermission: permissionVerifierAdapter
}

export const Router: React.FC = () => {
  return <>
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/edit' element={<Pages.EditArticle />} /> */}

          {/* <Route element={
            <PrivateRoute permission={'CreateArticle'}>
              <Route path='/article/new' element={<Pages.EditArticle />} />
            </PrivateRoute>}>
          </Route> */}

          {/* <Route element={
            <PrivateRoute permission={'ChangeArticle'}>
              <Route path='/article/:slugOrId/edit' element={<Pages.EditArticle />} />
            </PrivateRoute>}>
          </Route> */}

          <Route element={
            <PrivateRoute>
              <>
                <Route path='/my-articles' element={<Pages.MyArticles />} />
                <Route path='/my-account' element={<Pages.EditAccount />} />
              </>
            </PrivateRoute>}>
          </Route>

          <Route element={
            <PrivateRoute permission={'ChangeArticle'}>
              <Route path='/account/:accountId/edit' element={<Pages.EditAccount />} />
            </PrivateRoute>}>
          </Route>

          <Route element={
            <PrivateRoute permission={'CreateAccount'}>
              <Route path='/account/new' element={<Pages.EditAccount />} />
            </PrivateRoute>}>
          </Route>

          <Route element={
            <PrivateRoute permission={'ListAccounts'}>
              <Route path='/list-accounts' element={<Pages.ListAccounts />} />
            </PrivateRoute>}>
          </Route>

          <Route path='/article/:slugOrId' element={<Pages.ViewArticle />} />
          <Route path='/login' element={<Pages.Login />} />
          <Route path='/' element={<Pages.Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

type Props = {
  permission?: Permission
  children?: React.ReactElement
}

export const PrivateRoute = ({ permission, children }: Props): React.ReactElement => {
  const navigate = useNavigate()
  const isLogged = !!state.getCurrentAccountCredentials()
  if (!isLogged) navigate('/login')
  if (permission && !state.hasPermission(permission)) navigate('/')
  return children
}
