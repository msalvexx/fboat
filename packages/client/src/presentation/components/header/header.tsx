import React from 'react'
import Styles from './header-styles.scss'

import { AccountMenu } from '@/client/presentation/components'

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
  const isLogged = true
  const options = loggedUserOptions(isLogged)
  button = button ?? <a href='/article/new'>Criar Artigo</a>
  if (!isLogged) button = <a href='/login'>Entrar</a>
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
            <div hidden={buttonHidden} data-action><>{ button }</></div>
            <AccountMenu />
          </div>
      </nav>
    </div>
  )
}

export default Header
