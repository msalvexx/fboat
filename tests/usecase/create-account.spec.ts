import { EmailAlreadyInUseError, PersistDataChangeError } from '@/iam'
import { DbCreateAccount } from '@/iam/service/create-account'
import { GetAccountByEmailRepositoryMock } from '@/tests/mocks/get-account-by-email-repository'
import { SaveAccountRepositorySpy } from '@/tests/spies/save-account-repository-spy'

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
