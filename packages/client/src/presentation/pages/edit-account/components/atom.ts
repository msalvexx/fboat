import { atom } from 'recoil'

export const editAccountState = atom({
  key: 'editAccountState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    mainError: ''
  }
})
