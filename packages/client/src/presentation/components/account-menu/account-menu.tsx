import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import Styles from './account-menu-styles.scss'

import { Avatar, currentAccountState } from '@/client/presentation/components'
import { MyAccountOption, AdminOptions, LogoutOption, ClickablePhoto, accountMenuState } from './components'

const AccountMenu: React.FC = () => {
  const resetState = useResetRecoilState(accountMenuState)
  const [state] = useRecoilState(accountMenuState)
  const { getCurrentAccountCredentials } = useRecoilValue(currentAccountState)
  const { avatar, email, name } = getCurrentAccountCredentials()

  useEffect(() => resetState(), [])

  return <ul data-testid='account-menu'>
    <li>
     <ClickablePhoto avatar={avatar} />
      <div hidden={!state.isMenuOpened} className={Styles.accountMenu}>
          <ul>
              <Avatar title={name} subtitle={email} avatar={avatar}/>
              <MyAccountOption />
              <AdminOptions />
              <LogoutOption />
          </ul>
      </div>
    </li>
  </ul>
}

export default AccountMenu
