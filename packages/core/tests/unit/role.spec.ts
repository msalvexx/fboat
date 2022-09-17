import { Role } from '@/core/iam'

describe('When add permission to role', () => {
  test('Should add one permission to role', () => {
    const role = new Role('Maintainer')

    role.changePermissions(['CreateArticle'])

    expect(role.hasPermission('CreateArticle')).toBeTruthy()
  })

  test('Should add multiple permissions to role', () => {
    const role = new Role('Maintainer')

    role.changePermissions(['CreateArticle', 'DeleteArticle'])

    expect(role.hasPermission('CreateArticle')).toBeTruthy()
  })
})
