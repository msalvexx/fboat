import React from 'react'
import Styles from './header-styles.scss'

import { AccountMenu, currentAccountState } from '@/client/presentation/components'
import { useRecoilValue } from 'recoil'

type Button = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> |
React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

type Props = {
  button?: Button
  buttonHidden?: boolean
}

type ItemProps = {
  text: string
  href: string
  className?: string
}

const item: React.FC<ItemProps> = ({ text, href, className }: ItemProps) => <ul><a className={className} href={href}>{text}</a></ul>

const loggedUserOptions: React.FC<boolean> = (isLogged: boolean) => (
  isLogged ? <> {item({ text: 'Meus Artigos', href: '/my-articles' })} </> : <></>
)

const Header: React.FC<Props> = ({ button, buttonHidden }: Props) => {
  buttonHidden = buttonHidden ?? false
  const { getCurrentAccountCredentials: getCurrentAccount } = useRecoilValue(currentAccountState)
  const account = getCurrentAccount()
  const isLogged = !!account
  const options = loggedUserOptions(isLogged)
  button = button ?? <a data-testid='new-article-action' href='/article/new'>Criar Artigo</a>
  if (!isLogged) button = <a data-testid='login-action' href='/login'>Entrar</a>
  return (
    <div className={Styles.header}>
      <nav>
          <div>
              <a href="/">F-Boat</a>
          </div>

          <div>
            <ul>
              <a href="#">Sobre o projeto</a>
            </ul>
            {options}
            <div hidden={buttonHidden} data-testid='primary-action-wrapper' data-action><>{ button }</></div>
            { isLogged && <AccountMenu /> }
          </div>
      </nav>
    </div>
  )
}

export default Header
