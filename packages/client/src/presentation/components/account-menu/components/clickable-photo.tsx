import React from 'react'
import { useOutsideClick } from '@/client/presentation/hooks'
import { useRecoilState } from 'recoil'
import { accountMenuState } from './atom'

type ClickablePhotoProps = {
  avatar: string
}

export const ClickablePhoto: React.FC<ClickablePhotoProps> = ({ avatar }) => {
  const [state, setState] = useRecoilState(accountMenuState)
  const setMenuState = (isMenuOpened: boolean): void => setState({ ...state, isMenuOpened })
  const ref = useOutsideClick(() => setMenuState(false))
  return <>
    <a ref={ref} onClick={() => setMenuState(!state.isMenuOpened)}>
      <img src={avatar} className='uk-border-circle' width="48" height="48"/>
    </a>
  </>
}
