import { Role, Permission } from '@/iam/domain'

export class User {
  private readonly roles: Set<Role> = new Set()

  constructor (
    private readonly email: string,
    private readonly login: string,
    private password: string
  ) {}

  changePassword (password: string): void {
    this.password = password
  }

  verifyPassword (password: string): boolean {
    return this.password === password
  }

  addRole (role: Role): void {
    this.roles.add(role)
  }

  addRoles (roles: Role[]): void {
    roles.forEach(role => this.addRole(role))
  }

  hasRole (role: Role): boolean {
    return this.roles.has(role)
  }

  hasPermission (permission: Permission): boolean {
    const permissions: Set<Permission> = new Set(Array.from(this.roles).flatMap(x => Array.from(x.permissions)))
    return permissions.has(permission)
  }
}
