import { Role, Permission } from '@/iam/domain/model'

export namespace User {
  export type Params = {
    userId: string
    email: string
    password: string
    roles?: Role[]
  }
}

export class User {
  private _password: string
  readonly roles: Set<Role> = new Set()
  readonly userId: string
  readonly email: string

  constructor (params: User.Params) {
    this.userId = params.userId
    this.email = params.email
    this._password = params.password
    if (params.roles !== undefined) {
      this.changeRoles(params.roles)
    }
  }

  changePassword (password: string): void {
    this._password = password
  }

  public get password (): string {
    return this._password
  }

  changeRoles (roles: Role[]): void {
    this.resetRoles()
    roles.forEach(role => this.roles.add(role))
  }

  resetRoles (): void {
    this.roles.clear()
  }

  hasRole (role: Role): boolean {
    return this.roles.has(role)
  }

  hasPermission (permission: Permission): boolean {
    const permissions: Set<Permission> = new Set(Array.from(this.roles).flatMap(x => Array.from(x.permissions)))
    return permissions.has(permission)
  }
}
