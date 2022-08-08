import { ChangeAccount } from '../protocols'
import { Account } from './account'
import { availableRoles } from './factory'
import { Role } from './role'
import { User } from './user'

export const findRoleByName = (roleName: string): Role => availableRoles.find(role => role.name === roleName) as Role
export const findRolesByName = (roleNames: string[]): Role[] => availableRoles.filter(role => roleNames.includes(role.name))
export const changeAccount = (loggedUser: User, account: Account, params: ChangeAccount.Params): void => {
  if (loggedUser.hasPermission('ChangeAccount')) {
    account.changePersonalData(params.personalData)
    account.changeAccountActivation(params.isActive)
  }
  if (loggedUser.hasPermission('ChangeRole')) {
    const roles = findRolesByName(params.roles)
    account.user.changeRoles(roles)
  }
}
