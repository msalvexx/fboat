import { AuthenticateUser, ChangeAccount, ChangePassword, CreateAccount } from '@fboat/core/iam/protocols'

export const mockChangeAccountParams = (accountId = 'validAccountId'): ChangeAccount.Params => ({
  accountId,
  personalData: {
    birthDate: new Date(1987, 6, 15),
    firstName: 'Jose',
    lastName: 'Silva',
    occupation: 'Professor'
  },
  roles: ['Writer'],
  isActive: true
})

export const mockAuthenticateUserParams = (email = 'valid@mail.com'): AuthenticateUser.Params => ({
  email,
  password: '123'
})

export const mockChangePasswordParams = (accountId = 'validAccountId'): ChangePassword.Params => ({
  newPassword: 'newPassword',
  accountId
})

export const mockCreateAccountParams = (email = 'valid@mail.com'): CreateAccount.Params => ({
  email,
  password: '123',
  personalData: {
    firstName: 'first',
    lastName: 'last',
    occupation: 'any',
    birthDate: new Date()
  },
  roles: []
})
