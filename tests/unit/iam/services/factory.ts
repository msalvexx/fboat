import { AccountService, AuthenticationService } from '@/iam/service'
import { AccountRepositoryMock, CryptographyMock, HasherMock } from '@/tests/mocks/iam'

export namespace AccountServiceSut {
  type Sut = {
    sut: AccountService
    repo: AccountRepositoryMock
    hasher: HasherMock
  }

  export const makeSut = (): Sut => {
    const repo = new AccountRepositoryMock()
    const hasher = new HasherMock()
    return {
      sut: new AccountService(repo, hasher),
      repo,
      hasher
    }
  }
}

export namespace AuthenticationSut {
  type Sut = {
    sut: AuthenticationService
    repo: AccountRepositoryMock
    crypto: CryptographyMock
    hasher: HasherMock
  }

  export const makeSut = (): Sut => {
    const repo = new AccountRepositoryMock()
    const crypto = new CryptographyMock()
    const hasher = new HasherMock()
    return {
      sut: new AuthenticationService(repo, crypto, hasher),
      repo,
      crypto,
      hasher
    }
  }
}
