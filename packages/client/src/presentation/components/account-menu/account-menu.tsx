import React, { MutableRefObject, useState } from 'react'
import { useRecoilValue } from 'recoil'
import Styles from './account-menu-styles.scss'

import { User } from '@fboat/core'
import { useLogout } from '@/client/presentation/hooks'
import { Avatar, currentAccountState } from '@/client/presentation/components'

const useOutsideClick = (callback: () => void): MutableRefObject<any> => {
  const ref = React.useRef<any>()

  React.useEffect(() => {
    const handleClick = (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}

type AdminOptionsProps = {
  user: User | null
}

const AdminOptions: React.FC<AdminOptionsProps> = ({ user }) => {
  if (!user) return <></>
  const hasCreatePermission = user.hasPermission('CreateAccount')
  const hasListPermission = user.hasPermission('ListAccounts')
  const hasAnyPermission = hasCreatePermission || hasListPermission
  return <>
    { hasAnyPermission && <li data-divider></li>}
    { hasListPermission && <li><a data-testid='list-accounts-action' href="/list-accounts">Gerenciar contas cadastradas</a></li>}
    { hasCreatePermission && <li data-testid='create-account-action'><a href="/account/new">Criar nova conta de usuário</a></li>}
  </>
}

const AccountMenu: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount, getCurrentAccountCredentials } = useRecoilValue(currentAccountState)
  const { avatar, email, name } = getCurrentAccountCredentials()
  const { user } = getCurrentAccount()
  const [showMenuState, setMenuState] = useState(false)
  const ref = useOutsideClick(() => setMenuState(false))
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return <ul data-testid='account-menu'>
    <li>
      <a
        ref={ref}
        onClick={() => setMenuState(!showMenuState)}
      >
        <img src={avatar} className='uk-border-circle' width="48" height="48"/>
      </a>
      <div hidden={!showMenuState} className={Styles.accountMenu}>
          <ul>
              <Avatar title={name} subtitle={email} avatar={avatar}/>
              <li data-divider></li>
              <li><a href="/my-account">Minha conta</a></li>
              <AdminOptions user={user} />
              <li data-divider></li>
              <li data-logout><a data-testid='logout' onClick={handleLogout}>Sair da minha conta</a></li>
          </ul>
      </div>
    </li>
  </ul>
}

export default AccountMenu
