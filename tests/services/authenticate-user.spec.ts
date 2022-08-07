import { AuthenticateUser, UnauthorizedError } from '@/iam'

import { AccountServiceSut } from '@/tests/services/factory'
import { mockAccount } from '@/tests/mocks'

const mockAuthenticateUserParams = (email: string = 'valid@mail.com'): AuthenticateUser.Params => ({
  email,
  password: '123'
})

describe('When Authenticating user', () => {
  test('Should return UnauthorizedError if account was not found', async () => {
    const { sut } = AccountServiceSut.makeSut()
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual(new UnauthorizedError())
  })

  test('Should return UnauthorizedError if password not match', async () => {
    const { sut, repo, crypto } = AccountServiceSut.makeSut()
    repo.readResult = mockAccount()
    crypto.compareResult = false
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual(new UnauthorizedError())
  })

  test('Should return response correctly if authentication succeeds', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readResult = mockAccount()
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual({
      personName: 'any any',
      token: 'validToken'
    })
  })
})
