import { Article } from '@fboat/core/content-system'
import { GetArticleRepository, SaveArticleRepository } from '@/server/content-system/protocols'

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

export const mockArticle = (): Article => new Article({
  articleId: '123',
  author: {
    accountId: '8f5aaf39-d388-4e00-8bd4-440f6c5d2e85',
    name: 'any name',
    occupation: 'any occupation',
    photo: 'any photo'
  },
  content: '<html></html>',
  coverPhoto: 'any cover',
  summary: 'any summary',
  title: 'any title',
  isPublished: false,
  slug: 'any-title'
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
