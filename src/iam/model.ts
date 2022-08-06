type Feature = string

export class Role {
  features: string[] = []

  constructor (private readonly name: string) {}

  addFeature (feature: Feature): void {
    this.features.push(feature)
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

  hasRole (role: Role): boolean {
    return this.roles.has(role)
  }

  hasFeature (feature: Feature): boolean {
    const features = Array.from(this.roles).flatMap(x => x.features)
    return features.includes(feature)
  }
}
