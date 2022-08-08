import { UnauthorizedError } from '@/iam'
import { AuthenticationSut } from './factory'

describe('When certifying token of user', () => {
  test('Should return error if certification fails', async () => {
    const { sut } = AuthenticationSut.makeSut()

    const result = await sut.certificate('invalidToken')

    expect(result).toStrictEqual(new UnauthorizedError())
  })
})
