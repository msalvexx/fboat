import { mockAccount } from '@/tests/mocks/iam'
import { AccountServiceSut } from './factory'

describe('Get Account', () => {
  test('Should throw AccountNotFoundError if repository returns undefined', async () => {
    const { sut } = AccountServiceSut.makeSut()

    const promise = sut.getAccount({ accountId: 'invalidAccountId' })

    await expect(promise).rejects.toThrowError(Error)
  })

  test('Should return an account correctly if account exists', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const account = mockAccount({ accountId: 'validAccountId' })
    repo.readByAccountIdResult = account

    const result = await sut.getAccount({ accountId: account.accountId })

    expect(result).toStrictEqual({
      accountId: account.accountId,
      personalData: account.personalData,
      user: {
        userId: account.user.userId,
        email: account.user.email,
        roles: account.user.roles.map(x => x.name)
      },
      creationDate: account.creationDate,
      updateDate: account.updateDate,
      isActive: account.isActive
    })
  })
})
