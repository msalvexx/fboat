import { Role, User } from '@/iam/model'

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

  test('User should has both features if user has roles that has features', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const feature1 = 'WriteArticle'
    const feature2 = 'DeleteArticle'
    role.addFeature(feature1)
    role2.addFeature(feature2)

    sut.addRole(role)
    sut.addRole(role2)

    expect(sut.hasFeature('WriteArticle')).toBeTruthy()
    expect(sut.hasFeature('DeleteArticle')).toBeTruthy()
  })
})
