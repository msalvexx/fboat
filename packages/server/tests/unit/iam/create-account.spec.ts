import { EmailAlreadyInUseError, PersistDataChangeError } from '@fboat/core/iam/models'

import { mockAccount, mockCreateAccountParams } from '@/tests/mocks/iam'
import { AccountServiceSut } from '@/tests/unit/iam/factory'

describe('Db Create account', () => {
  test('Should return EmailAlreadyInUseError if email already in use', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const invalidEmail = 'test@mail.com'
    const params = mockCreateAccountParams(invalidEmail)
    repo.readResult = mockAccount({ user: { email: 'invalidEmail' } })

    const promise = sut.createAccount(params)

    await expect(promise).rejects.toThrowError(new EmailAlreadyInUseError(invalidEmail))
  })

  test('Should call save account on repository', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const params = mockCreateAccountParams()

    const account = await sut.createAccount(params)

    expect(repo.insertAccount).toStrictEqual(mockAccount({
      accountId: account.accountId,
      personalData: params.personalData,
      user: {
        email: params.email,
        password: params.password,
        userId: account.user.userId,
        roles: []
      }
    }))
  })

  test('Should hash password', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const params = mockCreateAccountParams()

    await sut.createAccount(params)

    const expectedAccount = mockAccount({ user: { email: 'valid@mail.com', password: 'hashedPassword' } })
    expect(repo.insertAccount.user.password).toStrictEqual(expectedAccount.user.password)
  })

  test('Should return PersistDataChangeError if save account on repository fails', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const params = mockCreateAccountParams()
    repo.insertResult = false

    const promise = sut.createAccount(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })

  test('Should call default photo with author name', async () => {
    const { sut, defaultPhotoServiceMock } = AccountServiceSut.makeSut()
    const params = mockCreateAccountParams()

    await sut.createAccount(params)

    expect(defaultPhotoServiceMock.params).toStrictEqual('first last')
  })
})
