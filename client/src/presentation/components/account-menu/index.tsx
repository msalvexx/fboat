import React, { useState } from 'react'
import Styles from './styles.scss'

import { Avatar } from '@/presentation/components'

const AccountMenu: React.FC = () => {
  const name = 'Jhon Doe'
  const email = 'jhon.doe@mail.com'
  const avatar = 'https://ui-avatars.com/api/?name=John+Doe&rounded=true'
  const [menuState, setMenuState] = useState(true)
  return <ul>
    <li>
      <a onClick={() => setMenuState(!menuState)}>
        <img src={avatar} width="48" height="48"/>
      </a>
      <div hidden={menuState} className={Styles.accountMenu}>
          <ul>
              <Avatar title={name} subtitle={email} avatar={avatar}/>
              <li data-divider></li>
              <li><a href="#">Minha conta</a></li>
              <li data-divider></li>
              <li><a href="#">Gerenciar contas cadastradas</a></li>
              <li><a href="#">Criar nova conta de usuário</a></li>
              <li data-divider></li>
              <li data-logout><a href="#">Sair da minha conta</a></li>
          </ul>
      </div>
    </li>
  </ul>
}

export default AccountMenu
