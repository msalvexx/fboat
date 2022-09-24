import { availableRoles } from './factory'
import { Role } from './role'

export const findRoleByName = (roleName: string): Role => availableRoles.find((role: any) => role.name === roleName)
export const findRolesByName = (roleNames: string[]): Role[] => availableRoles.filter((role: any) => roleNames.includes(role.name))
export const getAvailableRoleNames = () => availableRoles.map(x => x.name)
