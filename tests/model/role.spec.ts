import { Role } from '@/iam'

describe('When add permission to role', () => {
  test('Should add one permission to role', () => {
    const role = new Role('Maintainer')

    role.changePermissions(['WriteArticle'])

    expect(role.hasPermission('WriteArticle')).toBeTruthy()
  })

  test('Should add multiple permissions to role', () => {
    const role = new Role('Maintainer')

    role.changePermissions(['WriteArticle', 'DeleteArticle'])

    expect(role.hasPermission('WriteArticle')).toBeTruthy()
  })
})
