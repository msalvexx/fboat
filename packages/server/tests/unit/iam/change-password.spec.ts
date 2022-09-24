import { PersistDataChangeError } from '@fboat/core/iam/models'

import { mockAccount, mockChangePasswordParams } from '@/tests/mocks/iam'
import { AccountServiceSut } from './factory'

describe('When change password', () => {
  test('will change user password correctly', async () => {
    const { sut, repo, hasher } = AccountServiceSut.makeSut()
    const params = mockChangePasswordParams()
    const hashedPassword = `hashed${params.newPassword}`
    repo.readByAccountIdResult = mockAccount({ accountId: params.accountId })
    hasher.generateResult = hashedPassword

    await sut.changePassword(params)

    expect(repo.updateAccount.user.password).toBe(hashedPassword)
  })

  test('Will return error if save fails', async () => {
    const { sut, repo, hasher } = AccountServiceSut.makeSut()
    const params = mockChangePasswordParams()
    repo.readByAccountIdResult = mockAccount({ accountId: params.accountId })
    repo.updateResult = false
    hasher.compareResult = true

    const promise = sut.changePassword(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })
})
