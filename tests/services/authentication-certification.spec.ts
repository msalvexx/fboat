import { UnauthorizedError } from '@/iam'
import { mockAccount } from '@/tests/mocks'
import { AuthenticationSut } from './factory'

describe('When certifying token of user', () => {
  test('Should return error if certification fails', async () => {
    const { sut } = AuthenticationSut.makeSut()

    const result = await sut.certificate('invalidToken')

    expect(result).toStrictEqual(new UnauthorizedError())
  })

  test('Should return the logged user', async () => {
    const { sut, repo } = AuthenticationSut.makeSut()
    repo.readResult = mockAccount()

    const user = await sut.certificate('validToken')

    expect(user).toStrictEqual(mockAccount().user)
  })
})
