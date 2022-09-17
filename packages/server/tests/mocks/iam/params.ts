import { AuthenticateUser, ChangeAccount, ChangePassword, CreateAccount } from '@/core/iam'

export const mockChangeAccountParams = (accountId: string = 'validAccountId'): ChangeAccount.Params => ({
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

export const mockAuthenticateUserParams = (email: string = 'valid@mail.com'): AuthenticateUser.Params => ({
  email,
  password: '123'
})

export const mockChangePasswordParams = (accountId: string = 'validAccountId'): ChangePassword.Params => ({
  newPassword: 'newPassword',
  accountId
})

export const mockCreateAccountParams = (email: string = 'valid@mail.com'): CreateAccount.Params => ({
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
