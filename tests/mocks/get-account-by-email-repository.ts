import { Account, User } from '@/iam'
import { GetAccountByEmail, GetAccountByEmailRepository } from '@/iam/domain/repository'

export class GetAccountByEmailRepositoryMock implements GetAccountByEmailRepository {
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
