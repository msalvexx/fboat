import { Permission } from '.'

export class Role {
  readonly permissions: Set<Permission> = new Set()

  constructor (readonly name: string) {}

  changePermissions (permissions: Permission[]): void {
    if (permissions.length === 0) return
    this.permissions.clear()
    permissions.forEach(permission => this.permissions.add(permission))
  }

  hasPermission (permission: Permission): boolean {
    return this.permissions.has(permission)
  }
}
