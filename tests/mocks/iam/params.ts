import { AuthenticateUser, ChangeAccount, ChangePassword, CreateAccount } from '@/iam/domain/protocols'

export const mockChangeAccountParams = (id: string = 'validAccountId'): ChangeAccount.Params => ({
  id,
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

export const mockChangePasswordParams = (id: string = 'validAccountId'): ChangePassword.Params => ({
  newPassword: 'newPassword',
  id
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
