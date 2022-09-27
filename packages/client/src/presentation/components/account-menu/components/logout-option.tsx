import { useLogout } from '@/client/presentation/hooks'
import React from 'react'

export const LogoutOption: React.FC = () => {
  const logout = useLogout()
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault()
    logout()
  }
  return <>
    <li data-divider></li>
    <li data-logout><a data-testid='logout' onClick={handleLogout}>Sair da minha conta</a></li>
  </>
}
