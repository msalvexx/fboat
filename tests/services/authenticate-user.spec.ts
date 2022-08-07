import { GetAccountByEmailRepository, UnauthorizedError } from '@/iam'
import { AuthenticateUser } from '@/iam/domain/service/authenticate-user'

import { GetAccountByEmailRepositoryMock } from '@/tests/mocks/get-account-by-email-repository'
import { mockAccount } from '@/tests/mocks/account'

export class DbAuthenticateUser {
  constructor (
    private readonly readRepo: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<any> {
    return new UnauthorizedError()
  }
}

const mockAuthenticateUserParams = (email: string = 'valid@mail.com'): AuthenticateUser.Params => ({
  email,
  password: '123'
})

interface HashComparer {
  compare: (plaintext: string, digest: string) => Promise<boolean>
}

class HashComparerMock implements HashComparer {
  result: boolean = true

  async compare (plaintext: string, digest: string): Promise<boolean> {
    return true
  }
}

type Sut = {
  sut: DbAuthenticateUser
  readRepo: GetAccountByEmailRepositoryMock
  hashComparer: HashComparerMock
}

const makeSut = (): Sut => {
  const readRepo = new GetAccountByEmailRepositoryMock()
  const hashComparer = new HashComparerMock()
  return {
    sut: new DbAuthenticateUser(readRepo, hashComparer),
    readRepo,
    hashComparer
  }
}

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
})
