import { AccountService, AuthenticationService } from '@/server/iam/service'

import { AccountRepositoryMock, CryptographyMock, HasherMock, AvatarPhotoProviderMock } from '@/tests/mocks/iam'

export namespace AccountServiceSut {
  type Sut = {
    sut: AccountService
    repo: AccountRepositoryMock
    hasher: HasherMock
    defaultPhotoServiceMock: AvatarPhotoProviderMock
  }

  export const makeSut = (): Sut => {
    const repo = new AccountRepositoryMock()
    const hasher = new HasherMock()
    const defaultPhotoServiceMock = new AvatarPhotoProviderMock()
    return {
      sut: new AccountService(repo, hasher, defaultPhotoServiceMock),
      repo,
      hasher,
      defaultPhotoServiceMock
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
