import { ChangePassword, PersistDataChangeError } from '@/iam'
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

  test('Will return error if save fails', async () => {
    const { sut, repo, hasher } = AccountServiceSut.makeSut()
    const params = mockParams()
    repo.readResult = mockAccount(params.email)
    repo.saveResult = false
    hasher.compareResult = true

    const promise = sut.changePassword(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })
})
