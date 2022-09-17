import { User } from '@/core/iam/model'

interface Sut {
  sut: User
  roleName: string
}

const makeSut = (): Sut => {
  const roleName = 'Writer'
  return {
    sut: new User({ userId: '123', email: 'user@mail.com', password: '123', roles: [roleName] }),
    roleName
  }
}

describe('When add role to user', () => {
  test('Should add role if user not have role yet', () => {
    const { sut, roleName } = makeSut()

    sut.changeRoles([roleName])

    expect(sut.hasRole(roleName)).toBeTruthy()
  })

  test('User should has permission if user has role that contains permission', () => {
    const { sut } = makeSut()

    expect(sut.hasPermission('CreateArticle')).toBeTruthy()
  })

  test('User should not has permission if user not has any role that contains permission', () => {
    const { sut } = makeSut()

    expect(sut.hasPermission('ReadFBoatData')).toBeFalsy()
  })

  test('User should has both permissions if user has roles that has permissions', () => {
    const { sut } = makeSut()

    sut.changeRoles(['Administrator'])

    expect(sut.hasPermission('CreateArticle')).toBeTruthy()
    expect(sut.hasPermission('DeleteAccount')).toBeTruthy()
  })

  test('User can add multiple roles', () => {
    const { sut, roleName } = makeSut()

    sut.changeRoles(['Administrator', roleName])

    expect(sut.hasRole('Administrator')).toBeTruthy()
    expect(sut.hasRole(roleName)).toBeTruthy()
  })
})
