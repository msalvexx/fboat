export type Permission = string

export class Role {
  permissions: Set<Permission> = new Set()

  constructor (readonly name: string) {}

  changePermissions (permissions: Permission[]): void {
    this.permissions.clear()
    permissions.forEach(permission => this.permissions.add(permission))
  }

  hasPermission (permission: Permission): boolean {
    return this.permissions.has(permission)
  }
}

const availableRoles: Role[] = [
  new Role('Writer'),
  new Role('Reader'),
  new Role('Maintainer'),
  new Role('Administrator'),
  new Role('BoatController')
]

export const findRolesByName = (roleNames: string[]): Role[] => availableRoles.filter(role => roleNames.includes(role.name))
