import { Account } from '@/client/domain'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: null as () => Account,
    setCurrentAccount: null as (account: Account | undefined) => void
  }
})
