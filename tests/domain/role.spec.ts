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
}

type Feature = string

export class Role {
  features: string[] = []

  constructor (private readonly name: string) {}

  addFeature (feature: Feature): void {
    this.features.push(feature)
  }
}

describe('When add role to user', () => {
  test('Should add role if user not have role yet', () => {
    const user = new User('user', 'user@mail.com', 'teste123', '123')
    const role = new Role('Author')
    role.addFeature('WriteArticle')

    user.addRole(role)

    expect(user.hasRole(role)).toBeTruthy()
  })
})
