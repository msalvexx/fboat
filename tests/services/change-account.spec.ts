import { findRolesByName, PersistDataChangeError } from '@/iam'
import { mockAccount, mockChangeAccountParams, mockUser } from '@/tests/mocks'
import { AccountServiceSut } from './factory'

describe('When change account', () => {
  test('Will update roles and personal data correctly', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readResult = mockAccount({ user: { email: 'any-email@mail.com' } })
    const params = mockChangeAccountParams()

    await sut.changeAccount(params)

    const user = mockUser({ email: params.email })
    user.changeRoles(findRolesByName(['Writer']))
    const expectedAccount = mockAccount({ user, personalData: params.personalData })
    expect(repo.account.personalData).toStrictEqual(expectedAccount.personalData)
    expect(repo.account.user.roles).toStrictEqual(expectedAccount.user.roles)
  })

  test('Will return error if save fails', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readResult = mockAccount({ user: { email: 'any-email@mail.com' } })
    repo.saveResult = false
    const params = mockChangeAccountParams()

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })
})
