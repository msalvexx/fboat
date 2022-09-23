import { Role, Permission, findRolesByName, findRoleByName } from '.'

export namespace User {
  export type Params = {
    userId: string
    email: string
    password?: string
    roles?: string[]
  }
}

export class User {
  private readonly _roles: Set<Role> = new Set()
  private _password: string
  readonly userId: string
  readonly email: string

  constructor (params: User.Params) {
    this.userId = params.userId
    this.email = params.email
    this._password = params.password ?? ''
    if (params.roles !== undefined && params.roles.length !== 0) {
      this.changeRoles(params.roles)
    }
  }

  changePassword (password: string): void {
    this._password = password
  }

  public get password (): string {
    return this._password
  }

  public get roles (): Role[] {
    return Array.from(this._roles)
  }

  changeRoles (names: string[]): void {
    this.resetRoles()
    const rolesToAdd = findRolesByName(names)
    rolesToAdd.forEach(role => this._roles.add(role))
  }

  resetRoles (): void {
    this._roles.clear()
  }

  hasRole (roleName: string): boolean {
    return this._roles.has(findRoleByName(roleName))
  }

  hasPermission (permission: Permission): boolean {
    const permissions: Set<Permission> = new Set(Array.from(this._roles).flatMap(x => Array.from(x.permissions)))
    return permissions.has(permission)
  }
}
