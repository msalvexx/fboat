import { atom } from 'recoil'

export const accountMenuState = atom({
  key: 'accountMenuState',
  default: {
    user: null,
    isMenuOpened: false
  }
})
