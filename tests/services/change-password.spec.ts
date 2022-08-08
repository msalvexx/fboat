import { ChangePassword } from '@/iam'
import { mockAccount } from '../mocks'
import { AccountServiceSut } from './factory'

const mockParams = (): ChangePassword.Params => ({
  oldPassword: '123',
  newPassword: 'newPassword',
  email: 'any-email@mail.com'
})

describe('When change password', () => {
  test('will change user password correctly', async () => {
    const { sut, repo, crypto } = AccountServiceSut.makeSut()
    const params = mockParams()
    const hashedPassword = `hashed${params.newPassword}`
    repo.readResult = mockAccount(params.email)
    crypto.generateHashResult = hashedPassword

    await sut.changePassword(params)

    expect(repo.account.user.password).toBe(hashedPassword)
  })
})
