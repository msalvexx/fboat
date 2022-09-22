import { AuthenticateUser } from '@fboat/core/iam/protocols'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as unknown as () => AuthenticateUser.Result,
    setCurrentAccount: null as unknown as (account: AuthenticateUser.Result | undefined) => void
  }
})
