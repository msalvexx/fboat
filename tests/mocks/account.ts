import { Account, User } from '@/iam'

export function mockAccount (email: string = 'valid@mail.com'): Account {
  const user = new User('123', email, '123')
  const personalData = {
    firstName: 'any',
    lastName: 'any',
    occupation: 'any',
    birthDate: new Date()
  }
  return new Account('123', user, personalData)
}
