import { Account, CreateAccount, User } from '@/iam'
import { createAccount } from '@/iam/domain/model/factory'

class EmailAlreadyInUseError extends Error {
  constructor (email: string) {
    super(`Email: ${email} is already in use`)
    this.name = 'EmailAlreadyInUseError'
  }
}

class PersistDataChangeError extends Error {
  constructor (type: string) {
    super(`Failed to persist changes on ${type}`)
    this.name = 'PersistDataChangeError'
  }
}

export namespace GetAccountByEmail {
  export type Params = string
  export type Result = Promise<Account>
}

interface GetAccountByEmailRepository {
  getByEmail: (email: GetAccountByEmail.Params) => GetAccountByEmail.Result
}

export namespace SaveAccountRepository {
  export type Params = Account
  export type Result = Promise<boolean>
}

interface SaveAccountRepository {
  save: (account: SaveAccountRepository.Params) => SaveAccountRepository.Result
}

class SaveAccountRepositorySpy implements SaveAccountRepository {
  account: Account
  calls: number = 0
  result: boolean = true

  async save (account: SaveAccountRepository.Params): SaveAccountRepository.Result {
    this.account = account
    this.calls++
    return this.result
  }
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
    private readonly readRepo: GetAccountByEmailRepository,
    private readonly saveRepo: SaveAccountRepository
  ) {}

  async create (params: CreateAccount.Params): Promise<any> {
    const { email } = params
    const retrievedAccount = this.readRepo.getByEmail(email)
    if ((await retrievedAccount).user.email === email) return new EmailAlreadyInUseError(email)
    const newAccount = createAccount(params)
    if (!(await this.saveRepo.save(newAccount))) return new PersistDataChangeError(newAccount.constructor.name)
    return newAccount
  }
}

type Sut = {
  sut: DbCreateAccount
  saveRepo: SaveAccountRepositorySpy
}

const makeSut = (): Sut => {
  const readRepo = new GetAccountByEmailRepositoryMock()
  const saveRepo = new SaveAccountRepositorySpy()
  return {
    sut: new DbCreateAccount(readRepo, saveRepo),
    saveRepo
  }
}

describe('Db Create account', () => {
  test('Should return EmailAlreadyInUseError if email already in use', async () => {
    const { sut } = makeSut()
    const invalidEmail = 'test@mail.com'
    const params = {
      email: invalidEmail,
      firstName: 'first',
      lastName: 'last',
      password: '123',
      occupation: 'any',
      birthDate: new Date()
    }

    const result = await sut.create(params)

    expect(result).toStrictEqual(new EmailAlreadyInUseError(invalidEmail))
  })

  test('Should call save account on repository', async () => {
    const { sut, saveRepo } = makeSut()
    const params = {
      email: 'valid@mail.com',
      firstName: 'first',
      lastName: 'last',
      password: '123',
      occupation: 'any',
      birthDate: new Date()
    }

    const account = await sut.create(params)

    expect(saveRepo.account).toBe(account)
    expect(saveRepo.calls).toBe(1)
  })

  test('Should return PersistDataChangeError if save account on repository fails', async () => {
    const { sut, saveRepo } = makeSut()
    const params = {
      email: 'valid@mail.com',
      firstName: 'first',
      lastName: 'last',
      password: '123',
      occupation: 'any',
      birthDate: new Date()
    }
    saveRepo.result = false

    const result = await sut.create(params)

    expect(result).toStrictEqual(new PersistDataChangeError('Account'))
  })
})
