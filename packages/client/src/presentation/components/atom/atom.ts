import { AccountCredentials } from '@/client/domain'
import { Permission } from '@fboat/core'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccountCredentials: null as () => AccountCredentials,
    setCurrentAccountCredentials: null as (account: AccountCredentials | undefined) => void,
    hasPermission: null as (permission: Permission) => boolean
  }
})
