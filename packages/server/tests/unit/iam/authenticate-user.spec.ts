import { UnauthorizedError } from '@fboat/core/iam/models'

import { AuthenticationSut } from '@/tests/unit/iam/factory'
import { mockAuthenticateUserParams, mockAccount } from '@/tests/mocks/iam'

describe('When Authenticating user', () => {
  test('Should return UnauthorizedError if account was not found', async () => {
    const { sut } = AuthenticationSut.makeSut()
    const params = mockAuthenticateUserParams()

    const promise = sut.authenticate(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should return UnauthorizedError if password not match', async () => {
    const { sut, repo, hasher } = AuthenticationSut.makeSut()
    repo.readResult = mockAccount()
    hasher.compareResult = false
    const params = mockAuthenticateUserParams()

    const promise = sut.authenticate(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should return response correctly if authentication succeeds', async () => {
    const { sut, repo } = AuthenticationSut.makeSut()
    const account = mockAccount()
    const personalData = account.personalData
    account.changePersonalData({ ...personalData, photo: 'any' })
    repo.readResult = account
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual({
      personName: 'any any',
      token: 'validToken',
      avatar: 'any'
    })
  })
})
