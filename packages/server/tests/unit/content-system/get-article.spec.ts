import { ResourceNotFoundError } from '@fboat/core/shared/models'
import { mockArticleParams } from '@/tests/mocks/content-system'
import { ArticleServiceSut } from './factory'

describe('Get Article', () => {
  let sut: ArticleServiceSut.Sut

  beforeEach(() => (sut = ArticleServiceSut.makeSut()))

  test('Should throw ArticleNotFound if article was not found', async () => {
    const { articleService } = sut

    const promise = articleService.get({ idOrSlug: 'invalid-id' })

    await expect(promise).rejects.toThrowError(new ResourceNotFoundError())
  })

  test('Should return a valid article if the article was found', async () => {
    const { articleService, repository } = sut
    const params = mockArticleParams()
    repository.getResult = params

    const result = await articleService.get({ idOrSlug: 'valid id' })

    expect(result.articleId).toBeDefined()
    expect(result.author.accountId).toBeDefined()
    expect(result.author.occupation).toBe('any occupation')
    expect(result.title).toBe('any title')
    expect(result.slug).toBe('any-title')
    expect(result.isPublished).toStrictEqual(true)
  })
})
