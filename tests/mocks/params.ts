import { AuthenticateUser, ChangeAccount, ChangePassword, CreateAccount } from '@/iam/domain/protocols'

export const mockChangeAccountParams = (email: string = 'valid@mail.com'): ChangeAccount.Params => ({
  email,
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

export const mockChangePasswordParams = (email: string = 'any-email@mail.com'): ChangePassword.Params => ({
  newPassword: 'newPassword',
  email
})

export const mockCreateAccountParams = (email: string = 'valid@mail.com'): CreateAccount.Params => ({
  email,
  firstName: 'first',
  lastName: 'last',
  password: '123',
  occupation: 'any',
  birthDate: new Date()
})
