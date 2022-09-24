import { UnauthorizedError } from '@fboat/core/iam/models'

import { mockAccount } from '@/tests/mocks/iam'
import { AuthenticationSut } from './factory'

describe('When certifying token of user', () => {
  test('Should return error if certification fails', async () => {
    const { sut } = AuthenticationSut.makeSut()

    const promise = sut.certificate('invalidToken')

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Should return the logged user', async () => {
    const { sut, repo } = AuthenticationSut.makeSut()
    repo.readResult = mockAccount()

    const account = await sut.certificate('validToken')

    expect(account).toStrictEqual(mockAccount())
  })
})
