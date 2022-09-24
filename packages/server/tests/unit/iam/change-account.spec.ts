import { PersistDataChangeError } from '@fboat/core/iam/models'

import { mockAccount, mockChangeAccountParams } from '@/tests/mocks/iam'
import { AccountServiceSut } from './factory'

describe('When change account', () => {
  test('Will update roles and personal data correctly', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readByAccountIdResult = mockAccount({ accountId: 'validAccountId' })
    const params = mockChangeAccountParams()

    await sut.changeAccount(params)

    const expectedAccount = mockAccount({
      accountId: params.accountId,
      user: {
        roles: ['Writer']
      },
      personalData: params.personalData
    })
    expect(repo.updateAccount.personalData).toStrictEqual(expectedAccount.personalData)
    expect(repo.updateAccount.user.roles).toStrictEqual(expectedAccount.user.roles)
  })

  test('Will return error if save fails', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readByAccountIdResult = mockAccount({ accountId: 'invalidAccountId' })
    repo.updateResult = false
    const params = mockChangeAccountParams()

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })
})
