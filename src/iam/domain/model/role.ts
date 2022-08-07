export type Permission = string

export class Role {
  permissions: Set<Permission> = new Set()

  constructor (private readonly name: string) {}

  addPermission (permission: Permission): void {
    this.permissions.add(permission)
  }

  addPermissions (permissions: Permission[]): void {
    permissions.forEach(permission => this.addPermission(permission))
  }

  hasPermission (permission: Permission): boolean {
    return this.permissions.has(permission)
  }
}
