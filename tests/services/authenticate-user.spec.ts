import { GetAccountByEmailRepository, UnauthorizedError } from '@/iam'
import { AuthenticateUser } from '@/iam/domain/service/authenticate-user'

import { GetAccountByEmailRepositoryMock } from '@/tests/mocks/get-account-by-email-repository'

export class DbAuthenticateUser {
  constructor (private readonly readRepo: GetAccountByEmailRepository) {}

  async authenticate (params: AuthenticateUser.Params): Promise<any> {
    return new UnauthorizedError()
  }
}

const mockAuthenticateUserParams = (email: string = 'valid@mail.com'): AuthenticateUser.Params => ({
  email,
  password: '123'
})

type Sut = {
  sut: DbAuthenticateUser
  readRepo: GetAccountByEmailRepositoryMock
}

const makeSut = (): Sut => {
  const readRepo = new GetAccountByEmailRepositoryMock()
  return {
    sut: new DbAuthenticateUser(readRepo),
    readRepo
  }
}

describe('When Authenticating user', () => {
  test('Should return UnauthorizedError if account was not found', async () => {
    const { sut } = makeSut()
    const params = mockAuthenticateUserParams()

    const result = await sut.authenticate(params)

    expect(result).toStrictEqual(new UnauthorizedError())
  })
})
