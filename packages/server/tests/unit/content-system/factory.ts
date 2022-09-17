import { ArticleService } from '@/server/content-system/services'

import { ArticleRepositoryMock } from '@/tests/mocks/content-system'

export namespace ArticleServiceSut {
  export type Sut = {
    articleService: ArticleService
    repository: ArticleRepositoryMock
  }

  export const makeSut = (): Sut => {
    const repository = new ArticleRepositoryMock()
    return {
      articleService: new ArticleService(repository),
      repository
    }
  }
}
