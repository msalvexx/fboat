import { AccountCredentials } from '@/client/domain'
import { Account } from '@fboat/core'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccountCredentials: null as () => AccountCredentials,
    setCurrentAccountCredentials: null as (account: AccountCredentials | undefined) => void,
    getCurrentAccount: null as () => Account
  }
})
