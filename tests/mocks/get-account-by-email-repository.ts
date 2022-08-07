import { Account, AccountNotFoundError } from '@/iam'
import { GetAccountByEmail, GetAccountByEmailRepository } from '@/iam/domain/repository'

export class GetAccountByEmailRepositoryMock implements GetAccountByEmailRepository {
  result: Account | Error

  async getByEmail (email: string): Promise<GetAccountByEmail.Result> {
    if (!this.result) return new AccountNotFoundError(email)
    return this.result
  }
}
