import React from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import * as Pages from '@/client/main/factories'
import { setCurrentAccountAdapter, getCurrentAccountAdapter, permissionVerifierAdapter } from '@/client/main/adapters'
import { currentAccountState } from '@/client/presentation/components'
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
          <Route path='/article'>
            <Route
              path=':slugOrId/edit'
              element={
                <PrivateRoute permission={'ChangeArticle'}>
                  <Pages.EditArticle />
                </PrivateRoute>
              }/>

            <Route path=':slugOrId' element={<Pages.ViewArticle />} />

            <Route
              path='new'
              element={
                <PrivateRoute permission={'CreateArticle'}>
                  <Pages.EditArticle />
                </PrivateRoute>
              }/>
          </Route>

          <Route
            path='/my-account'
            element={
              <PrivateRoute>
                <Pages.EditAccount />
              </PrivateRoute>
            }/>

          <Route
            path='/my-articles'
            element={
              <PrivateRoute>
                <Pages.MyArticles />
              </PrivateRoute>
            }/>

          <Route path='/account'>
            <Route
              path=':accountId/edit'
              element={
                <PrivateRoute permission={'ChangeArticle'}>
                  <Pages.EditAccount />
                </PrivateRoute>
              }/>

            <Route
              path='new'
              element={
                <PrivateRoute permission={'CreateAccount'}>
                  <Pages.EditAccount />
                </PrivateRoute>
              }/>
          </Route>

          <Route
            path='/list-accounts'
            element={
              <PrivateRoute permission={'ListAccounts'}>
                <Pages.ListAccounts />
              </PrivateRoute>
            }/>

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
