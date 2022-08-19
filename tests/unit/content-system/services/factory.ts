import { ArticleService } from '@/content-system/services'

import { AvatarPhotoProviderMock, SaveArticleRepositoryMock } from '@/tests/mocks/content-system'

export namespace ArticleServiceSut {
  export type Sut = {
    articleService: ArticleService
    defaultPhotoServiceMock: AvatarPhotoProviderMock
    repository: SaveArticleRepositoryMock
  }

  export const makeSut = (): Sut => {
    const repository = new SaveArticleRepositoryMock()
    const defaultPhotoServiceMock = new AvatarPhotoProviderMock()
    return {
      articleService: new ArticleService(defaultPhotoServiceMock, repository),
      defaultPhotoServiceMock,
      repository
    }
  }
}
