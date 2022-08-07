import { Role, User } from '@/iam'

interface Sut {
  sut: User
  role: Role
}

const makeSut = (): Sut => ({
  sut: new User('user@mail.com', 'teste123', '123'),
  role: new Role('Author')
})

describe('When user change password', () => {
  test('Should change password correctly', () => {
    const { sut } = makeSut()

    sut.changePassword('1234')

    expect(sut.verifyPassword('1234')).toBeTruthy()
  })
})

describe('When add role to user', () => {
  test('Should add role if user not have role yet', () => {
    const { sut, role } = makeSut()

    sut.changeRoles([role])

    expect(sut.hasRole(role)).toBeTruthy()
  })

  test('User should has permission if user has role that contains permission', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const permission = 'WriteArticle'
    role.changePermissions([permission])
    role2.changePermissions([permission])

    sut.changeRoles([role, role2])

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
    role.changePermissions([permission1])
    role2.changePermissions([permission2])

    sut.changeRoles([role, role2])

    expect(sut.hasPermission('WriteArticle')).toBeTruthy()
    expect(sut.hasPermission('DeleteArticle')).toBeTruthy()
  })

  test('User can add multiple roles', () => {
    const { sut, role } = makeSut()
    const role2 = new Role('Maintainer')
    const permission1 = 'WriteArticle'
    const permission2 = 'DeleteArticle'
    role.changePermissions([permission1])
    role2.changePermissions([permission2])

    sut.changeRoles([role, role2])

    expect(sut.hasPermission('WriteArticle')).toBeTruthy()
    expect(sut.hasPermission('DeleteArticle')).toBeTruthy()
  })
})
