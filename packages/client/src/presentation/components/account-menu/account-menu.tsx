import React, { MutableRefObject, useState } from 'react'
import Styles from './account-menu-styles.scss'

import { Avatar, currentAccountState } from '@/client/presentation/components'
import { User } from '@fboat/core'
import { useRecoilValue } from 'recoil'

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
    { hasListPermission && <li><a href="/list-accounts">Gerenciar contas cadastradas</a></li>}
    { hasCreatePermission && <li><a href="/account/new">Criar nova conta de usuário</a></li>}
  </>
}

const AccountMenu: React.FC = () => {
  const { getCurrentAccount, getCurrentAccountCredentials } = useRecoilValue(currentAccountState)
  const { avatar, email, name } = getCurrentAccountCredentials()
  const { user } = getCurrentAccount()
  const [showMenuState, setMenuState] = useState(false)
  const ref = useOutsideClick(() => setMenuState(false))
  return <ul data-testid='account-menu'>
    <li>
      <a
        ref={ref}
        onClick={() => setMenuState(!showMenuState)}
      >
        <img src={avatar} width="48" height="48"/>
      </a>
      <div hidden={!showMenuState} className={Styles.accountMenu}>
          <ul>
              <Avatar title={name} subtitle={email} avatar={avatar}/>
              <li data-divider></li>
              <li><a href="/my-account">Minha conta</a></li>
              <AdminOptions user={user} />
              <li data-divider></li>
              <li data-logout><a href="#">Sair da minha conta</a></li>
          </ul>
      </div>
    </li>
  </ul>
}

export default AccountMenu
