import { CreateAccount, EmailAlreadyInUseError, PersistDataChangeError } from '@/iam'
import { DbCreateAccount } from '@/iam/service/create-account'

import { GetAccountByEmailRepositoryMock } from '@/tests/mocks/get-account-by-email-repository'
import { SaveAccountRepositorySpy } from '@/tests/spies/save-account-repository-spy'
import { mockAccount } from '@/tests/mocks/account'

type Sut = {
  sut: DbCreateAccount
  readRepo: GetAccountByEmailRepositoryMock
  saveRepo: SaveAccountRepositorySpy
}

const makeSut = (): Sut => {
  const readRepo = new GetAccountByEmailRepositoryMock()
  const saveRepo = new SaveAccountRepositorySpy()
  return {
    sut: new DbCreateAccount(readRepo, saveRepo),
    readRepo,
    saveRepo
  }
}

const mockCreateAccountParams = (email: string = 'valid@mail.com'): CreateAccount.Params => ({
  email,
  firstName: 'first',
  lastName: 'last',
  password: '123',
  occupation: 'any',
  birthDate: new Date()
})

describe('Db Create account', () => {
  test('Should return EmailAlreadyInUseError if email already in use', async () => {
    const { sut, readRepo } = makeSut()
    const invalidEmail = 'test@mail.com'
    const params = mockCreateAccountParams(invalidEmail)
    readRepo.result = mockAccount(invalidEmail)

    const result = await sut.create(params)

    expect(result).toStrictEqual(new EmailAlreadyInUseError(invalidEmail))
  })

  test('Should call save account on repository', async () => {
    const { sut, saveRepo } = makeSut()
    const params = mockCreateAccountParams()

    const account = await sut.create(params)

    expect(saveRepo.account).toBe(account)
    expect(saveRepo.calls).toBe(1)
  })

  test('Should return PersistDataChangeError if save account on repository fails', async () => {
    const { sut, saveRepo } = makeSut()
    const params = mockCreateAccountParams()
    saveRepo.result = false

    const result = await sut.create(params)

    expect(result).toStrictEqual(new PersistDataChangeError('Account'))
  })
})
