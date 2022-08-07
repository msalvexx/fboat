import { Account, GetAccountByEmailRepository, UnauthorizedError } from '@/iam'
import { AuthenticateUser } from '@/iam/domain/service/authenticate-user'

import { GetAccountByEmailRepositoryMock } from '@/tests/mocks/get-account-by-email-repository'
import { mockAccount } from '@/tests/mocks/account'

export class DbAuthenticateUser {
  constructor (
    private readonly readRepo: GetAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const { email, password: digest } = params
    const retrievedAccount = await this.readRepo.getByEmail(email)
    if (!(retrievedAccount instanceof Account)) return new UnauthorizedError()
    const { userId, password } = retrievedAccount.user
    if (!(await this.hashComparer.compare(password, digest))) return new UnauthorizedError()
    const { accountId } = retrievedAccount
    const token = await this.tokenGenerator.generate({ accountId, userId })
    return {
      token,
      personName: retrievedAccount.personalData.fullName
    }
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
    return this.result
  }
}

export namespace TokenGenerator {
  export type Params = {
    accountId: string
    userId: string
  }

  export type Result = string
}

interface TokenGenerator {
  generate: (params: TokenGenerator.Params) => Promise<TokenGenerator.Result>
}

class TokenGeneratorMock implements TokenGenerator {
  result: string = 'validToken'

  async generate (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    return this.result
  }
}

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
