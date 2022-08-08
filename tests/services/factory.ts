import { findRolesByName, User } from '@/iam'
import { AccountService, AuthenticationService } from '@/iam/service'
import { AccountRepositoryMock, CryptographyMock, mockUser, HasherMock } from '@/tests/mocks'

export namespace AccountServiceSut {
  type Sut = {
    sut: AccountService
    repo: AccountRepositoryMock
    hasher: HasherMock
    loggedUser: User
  }

  export const makeSut = (): Sut => {
    const loggedUser = mockUser()
    loggedUser.changeRoles(findRolesByName(['Administrator']))
    const repo = new AccountRepositoryMock()
    const hasher = new HasherMock()
    return {
      sut: new AccountService(loggedUser, repo, hasher),
      repo,
      hasher,
      loggedUser
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
