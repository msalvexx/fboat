import { ArticleService } from '@/content-system/services'

import { SaveArticleRepositoryMock } from '@/tests/mocks/content-system'

export namespace ArticleServiceSut {
  export type Sut = {
    articleService: ArticleService
    repository: SaveArticleRepositoryMock
  }

  export const makeSut = (): Sut => {
    const repository = new SaveArticleRepositoryMock()
    return {
      articleService: new ArticleService(repository),
      repository
    }
  }
}
