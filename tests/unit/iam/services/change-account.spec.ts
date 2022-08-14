import { PersistDataChangeError } from '@/iam'
import { mockAccount, mockChangeAccountParams } from '@/tests/mocks/iam'
import { AccountServiceSut } from './factory'

describe('When change account', () => {
  test('Will update roles and personal data correctly', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readByAccountIdResult = mockAccount({ accountId: 'validAccountId' })
    const params = mockChangeAccountParams()

    await sut.changeAccount(params)

    const expectedAccount = mockAccount({
      accountId: params.id,
      user: {
        roles: ['Writer']
      },
      personalData: params.personalData
    })
    expect(repo.account.personalData).toStrictEqual(expectedAccount.personalData)
    expect(repo.account.user.roles).toStrictEqual(expectedAccount.user.roles)
  })

  test('Will return error if save fails', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readByAccountIdResult = mockAccount({ accountId: 'invalidAccountId' })
    repo.saveResult = false
    const params = mockChangeAccountParams()

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })
})