import { availableRoles } from './factory'
import { Role } from './role'

export const findRoleByName = (roleName: string): Role => availableRoles.find(role => role.name === roleName) as Role
export const findRolesByName = (roleNames: string[]): Role[] => availableRoles.filter(role => roleNames.includes(role.name))
