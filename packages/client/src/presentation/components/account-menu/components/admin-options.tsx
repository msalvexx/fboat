import React from 'react'
import { useRecoilValue } from 'recoil'
import { currentAccountState } from '@/client/presentation/components'

export const AdminOptions: React.FC = () => {
  const { hasPermission } = useRecoilValue(currentAccountState)
  const hasCreatePermission = hasPermission('CreateAccount')
  const hasListPermission = hasPermission('ListAccounts')
  const hasAnyPermission = hasCreatePermission || hasListPermission
  return <>
    { hasAnyPermission && <li data-divider></li>}
    { hasListPermission && <li><a data-testid='list-accounts-action' href="/list-accounts">Gerenciar contas cadastradas</a></li>}
    { hasCreatePermission && <li data-testid='create-account-action'><a href="/account/new">Criar nova conta de usuário</a></li>}
  </>
}
