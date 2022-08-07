import { AccountService } from '@/iam/service/account'
import { AccountRepositoryMock, CryptographyMock } from '@/tests/mocks'

export namespace AccountServiceSut {
  type Sut = {
    sut: AccountService
    repo: AccountRepositoryMock
    crypto: CryptographyMock
  }

  export const makeSut = (): Sut => {
    const repo = new AccountRepositoryMock()
    const crypto = new CryptographyMock()
    return {
      sut: new AccountService(repo, crypto),
      repo,
      crypto
    }
  }
}
