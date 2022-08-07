import { Account, CreateAccount, User } from '@/iam'

class EmailAlreadyInUseError extends Error {
  constructor (email: string) {
    super(`Email: ${email} is already in use`)
    this.name = 'EmailAlreadyInUseError'
  }
}

export namespace GetAccountByEmail {
  export type Params = string
  export type Result = Promise<Account>
}

interface GetAccountByEmailRepository {
  getByEmail: (email: GetAccountByEmail.Params) => GetAccountByEmail.Result
}

class GetAccountByEmailRepositoryMock implements GetAccountByEmailRepository {
  async getByEmail (email: string): GetAccountByEmail.Result {
    const user = new User('123', 'test@mail.com', '123')
    const personalData = {
      firstName: 'any',
      lastName: 'any',
      occupation: 'any',
      birthDate: new Date()
    }
    return new Account('123', user, personalData)
  }
}

export class DbCreateAccount {
  constructor (
    private readonly repo: GetAccountByEmailRepository
  ) {}

  async create (params: CreateAccount.Params): Promise<any> {
    const { email } = params
    const retrievedAccount = this.repo.getByEmail(email)
    if ((await retrievedAccount).user.email === email) throw new EmailAlreadyInUseError(email)
  }
}

describe('Db Create account', () => {
  test('Should throw EmailAlreadyInUseError if email already in use', async () => {
    const repo = new GetAccountByEmailRepositoryMock()
    const sut = new DbCreateAccount(repo)
    const params = {
      email: 'test@mail.com',
      firstName: 'first',
      lastName: 'last',
      password: '123',
      occupation: 'any',
      birthDate: new Date()
    }

    const promise = sut.create(params)

    await expect(promise).rejects.toThrowError(EmailAlreadyInUseError)
  })
})
