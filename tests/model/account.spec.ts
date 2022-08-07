import { Account, PersonalData, User } from '@/iam'

describe('Account', () => {
  test('Can change personal data', () => {
    const email = 'test@mail.com'
    const personalData: PersonalData = {
      firstName: 'any',
      lastName: 'name',
      birthDate: new Date(),
      occupation: 'Teacher'
    }
    const user = new User('123', email, '123')
    const sut = new Account('accountId', user, personalData)

    const data = {
      firstName: 'any',
      lastName: 'name',
      birthDate: new Date(),
      occupation: 'Developer'
    }
    sut.changePersonalData(data)

    expect(sut.personalData).toBe(data)
  })
})
