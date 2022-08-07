import { Role, Permission } from '@/iam/domain/model'

export class User {
  private readonly roles: Set<Role> = new Set()

  constructor (
    readonly userId: string,
    readonly email: string,
    private _password: string
  ) {}

  changePassword (password: string): void {
    this._password = password
  }

  public get password (): string {
    return this._password
  }

  changeRoles (roles: Role[]): void {
    this.roles.clear()
    roles.forEach(role => this.roles.add(role))
  }

  hasRole (role: Role): boolean {
    return this.roles.has(role)
  }

  hasPermission (permission: Permission): boolean {
    const permissions: Set<Permission> = new Set(Array.from(this.roles).flatMap(x => Array.from(x.permissions)))
    return permissions.has(permission)
  }
}
