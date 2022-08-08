import { ChangePassword, PersistDataChangeError, UnauthorizedError } from '@/iam'
import { mockAccount } from '../mocks'
import { AccountServiceSut } from './factory'

const mockParams = (): ChangePassword.Params => ({
  newPassword: 'newPassword',
  email: 'any-email@mail.com'
})

describe('When change password', () => {
  test('will change user password correctly', async () => {
    const { sut, repo, hasher } = AccountServiceSut.makeSut()
    const params = mockParams()
    const hashedPassword = `hashed${params.newPassword}`
    repo.readResult = mockAccount(params.email)
    hasher.generateResult = hashedPassword

    await sut.changePassword(params)

    expect(repo.account.user.password).toBe(hashedPassword)
  })

  test('will return UnauthorizedError if user not has permission to change password', async () => {
    const { sut, repo, loggedUser } = AccountServiceSut.makeSut()
    const params = mockParams()
    repo.readResult = mockAccount(params.email, '123', 'invalidId')
    loggedUser.resetRoles()

    const result = await sut.changePassword(params)

    expect(result).toStrictEqual(new UnauthorizedError())
  })

  test('Will return error if save fails', async () => {
    const { sut, repo, hasher } = AccountServiceSut.makeSut()
    const params = mockParams()
    repo.readResult = mockAccount(params.email)
    repo.saveResult = false
    hasher.compareResult = true

    const result = await sut.changePassword(params)

    expect(result).toStrictEqual(new PersistDataChangeError('Account'))
  })
})
