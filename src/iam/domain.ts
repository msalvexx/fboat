type Permission = string

export class Role {
  permissions: string[] = []

  constructor (private readonly name: string) {}

  addPermission (permission: Permission): void {
    this.permissions.push(permission)
  }
}

export class User {
  private readonly roles: Set<Role> = new Set<Role>()

  constructor (
    private readonly name: string,
    private readonly email: string,
    private readonly login: string,
    private readonly password: string
  ) {}

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
    const permissions = Array.from(this.roles).flatMap(x => x.permissions)
    return permissions.includes(permission)
  }
}
