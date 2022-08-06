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

type Feature = string

export class Role {
  features: string[] = []

  constructor (private readonly name: string) {}

  addFeature (feature: Feature): void {
    this.features.push(feature)
  }
}

interface Sut {
  sut: User
  role: Role
}

const makeSut = (): Sut => ({
  sut: new User('user', 'user@mail.com', 'teste123', '123'),
  role: new Role('Author')
})

describe('When add role to user', () => {
  test('Should add role if user not have role yet', () => {
    const { sut, role } = makeSut()

    sut.addRole(role)

    expect(sut.hasRole(role)).toBeTruthy()
  })

  test('User should has feature if user has role that contains feature', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const feature = 'WriteArticle'
    role.addFeature(feature)
    role2.addFeature(feature)

    sut.addRole(role)
    sut.addRole(role2)

    expect(sut.hasFeature(feature)).toBeTruthy()
  })

  test('User should not has feature if user not has any role that contains feature', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const feature = 'WriteArticle'
    role.addFeature(feature)
    role2.addFeature(feature)

    sut.addRole(role)
    sut.addRole(role2)

    expect(sut.hasFeature('ReadArticle')).toBeFalsy()
  })
})
