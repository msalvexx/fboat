import { atom } from 'recoil'

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    wasSubmitted: false,
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    mainError: ''
  }
})
