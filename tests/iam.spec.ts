import { Role, User } from '@/iam/domain'

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

  test('User should has permission if user has role that contains permission', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const permission = 'WriteArticle'
    role.addPermission(permission)
    role2.addPermission(permission)

    sut.addRole(role)
    sut.addRole(role2)

    expect(sut.hasPermission(permission)).toBeTruthy()
  })

  test('User should not has permission if user not has any role that contains permission', () => {
    const { sut } = makeSut()

    expect(sut.hasPermission('ReadArticle')).toBeFalsy()
  })

  test('User should has both permissions if user has roles that has permissions', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const permission1 = 'WriteArticle'
    const permission2 = 'DeleteArticle'
    role.addPermission(permission1)
    role2.addPermission(permission2)

    sut.addRole(role)
    sut.addRole(role2)

    expect(sut.hasPermission('WriteArticle')).toBeTruthy()
    expect(sut.hasPermission('DeleteArticle')).toBeTruthy()
  })

  test('User can add multiple roles', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const permission1 = 'WriteArticle'
    const permission2 = 'DeleteArticle'
    role.addPermission(permission1)
    role2.addPermission(permission2)

    sut.addRoles([role, role2])

    expect(sut.hasPermission('WriteArticle')).toBeTruthy()
    expect(sut.hasPermission('DeleteArticle')).toBeTruthy()
  })
})

describe('When add permission to role', () => {
  test('Should add one permission to role', () => {
    const role = new Role('Maintainer')

    role.addPermission('WriteArticle')

    expect(role.hasPermission('WriteArticle')).toBeTruthy()
  })
})
