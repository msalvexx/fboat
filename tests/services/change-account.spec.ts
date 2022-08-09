import { Account, ChangeAccount, findRolesByName, PersistDataChangeError, User } from '@/iam'
import { mockAccount } from '../mocks'
import { AccountServiceSut } from './factory'

const mockParams = (): ChangeAccount.Params => ({
  email: 'valid@mail.com',
  personalData: {
    birthDate: new Date(1987, 6, 15),
    firstName: 'Jose',
    lastName: 'Silva',
    occupation: 'Professor'
  },
  roles: ['Writer'],
  isActive: true
})

describe('When change account', () => {
  test('Will update roles and personal data correctly', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readResult = mockAccount('any-email@mail.com')
    const params = mockParams()

    await sut.changeAccount(params)

    const user = new User('123', params.email, '123')
    user.changeRoles(findRolesByName(['Writer']))
    const expectedAccount = new Account('123', user, params.personalData)
    expect(repo.account.personalData).toStrictEqual(expectedAccount.personalData)
    expect(repo.account.user.roles).toStrictEqual(expectedAccount.user.roles)
  })

  test('Will return error if save fails', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    repo.readResult = mockAccount('any-email@mail.com')
    repo.saveResult = false
    const params = mockParams()

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new PersistDataChangeError('Account'))
  })
})
