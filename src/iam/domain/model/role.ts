export type Permission = string

export class Role {
  permissions: Set<Permission> = new Set()

  constructor (private readonly name: string) {}

  changePermissions (permissions: Permission[]): void {
    this.permissions.clear()
    permissions.forEach(permission => this.permissions.add(permission))
  }

  hasPermission (permission: Permission): boolean {
    return this.permissions.has(permission)
  }
}
