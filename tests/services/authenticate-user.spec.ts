import { UnauthorizedError } from '@/iam'
import { AuthenticateUser } from '@/iam/domain/service'
import { DbAuthenticateUser } from '@/iam/service'

import { GetAccountByEmailRepositoryMock, HashComparerMock, mockAccount, TokenGeneratorMock } from '@/tests/mocks'

type Sut = {
  sut: DbAuthenticateUser
  readRepo: GetAccountByEmailRepositoryMock
  hashComparer: HashComparerMock
  tokenGenerator: TokenGeneratorMock
}

const makeSut = (): Sut => {
  const readRepo = new GetAccountByEmailRepositoryMock()
  const hashComparer = new HashComparerMock()
  const tokenGenerator = new TokenGeneratorMock()
  return {
    sut: new DbAuthenticateUser(readRepo, hashComparer, tokenGenerator),
    readRepo,
    hashComparer,
    tokenGenerator
  }
}

const mockAuthenticateUserParams = (email: string = 'valid@mail.com'): AuthenticateUser.Params => ({
  email,
  password: '123'
})

describe('When Authenticating user', () => {
  test('Should return UnauthorizedError if account was not found', async () => {
    const { sut } = makeSut()
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual(new UnauthorizedError())
  })

  test('Should return UnauthorizedError if password not match', async () => {
    const { sut, readRepo, hashComparer } = makeSut()
    readRepo.result = mockAccount()
    hashComparer.result = false
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual(new UnauthorizedError())
  })

  test('Should return response correctly if authentication succeeds', async () => {
    const { sut, readRepo } = makeSut()
    readRepo.result = mockAccount()
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual({
      personName: 'any any',
      token: 'validToken'
    })
  })
})
