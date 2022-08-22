import { Article, GetArticleRepository, SaveArticleRepository } from '@/content-system'

export const mockArticleParams = (): Article.Params => ({
  articleId: 'any id',
  content: 'any content',
  summary: 'any summary',
  title: 'any title',
  coverPhoto: 'any photo',
  author: {
    accountId: '123',
    name: 'name other',
    occupation: 'any occupation',
    photo: 'any photo'
  }
})

export class ArticleRepositoryMock implements SaveArticleRepository, GetArticleRepository {
  params: SaveArticleRepository.Params
  getResult: any = undefined

  async save (params: SaveArticleRepository.Params): Promise<SaveArticleRepository.Result> {
    this.params = params
  }

  async get (id: GetArticleRepository.Params): Promise<GetArticleRepository.Result> {
    return this.getResult
  }
}
