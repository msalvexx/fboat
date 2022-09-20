import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    email: '',
    emailDirty: '',
    emailError: '',
    password: '',
    passwordError: '',
    passwordDirty: '',
    mainError: ''
  }
})
