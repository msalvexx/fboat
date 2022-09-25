import React, { useEffect, useState } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom'

import * as Pages from '@/client/main/factories'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/client/main/adapters'
import { currentAccountState } from '@/client/presentation/components'
import { getAccountInformationAdapter } from '@/client/main/factories'
import { Account, Permission } from '@fboat/core'

const state = {
  setCurrentAccountCredentials: setCurrentAccountAdapter,
  getCurrentAccountCredentials: getCurrentAccountAdapter,
  getCurrentAccount: getAccountInformationAdapter
}

export const Router: React.FC = () => {
  const [account, setAccountState] = useState(null)

  useEffect(() => {
    state
      .getCurrentAccount()
      .then(account => setAccountState(account))
      .catch(console.error)
  }, [])

  return <>
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Routes>
        {
            account && <>
              <PrivateRoute account={account} permission={'CreateArticle'}>
                <Route path='/article/new' element={<Pages.EditArticle />} />
              </PrivateRoute>

              <PrivateRoute account={account} permission={'ChangeArticle'}>
                <Route path='/article/:slugOrId/edit' element={<Pages.EditArticle />} />
              </PrivateRoute>

              <Route element={<PrivateRoute account={account}/>}>
                <Route path='/my-articles' element={<Pages.MyArticles />} />
                <Route path='/my-account' element={<Pages.EditAccount />} />
              </Route>

              <PrivateRoute account={account} permission={'ChangeArticle'}>
                <Route path='/account/:accountId/edit' element={<Pages.EditAccount />} />
              </PrivateRoute>

              <PrivateRoute account={account} permission={'CreateAccount'}>
                <Route path='/account/new' element={<Pages.EditAccount />} />
              </PrivateRoute>

              <PrivateRoute account={account} permission={'ListAccounts'}>
                <Route path='/list-accounts' element={<Pages.ListAccounts />} />
              </PrivateRoute>
            </>
          }
          <Route path='/' element={<Pages.Home />} />
          <Route path='/article/:slugOrId' element={<Pages.ViewArticle />} />
          <Route path='/login' element={<Pages.Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </>
}

type Props = {
  account: Account
  permission?: Permission
  children?: React.ReactElement
}

export const PrivateRoute = ({ account, permission, children }: Props): React.ReactElement => {
  const navigate = useNavigate()

  if (!account || !account.user.hasPermission(permission)) navigate('/login')
  if (!account.user.hasPermission(permission)) navigate('/')

  return children ?? <Outlet/>
}
