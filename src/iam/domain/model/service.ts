import { availableRoles } from './factory'
import { Role } from './role'

export const findRolesByName = (roleNames: string[]): Role[] => availableRoles.filter(role => roleNames.includes(role.name))
