import { mockArticleParams } from '@/../tests/mocks/content-system'
import { ResourceNotFoundError } from '@/iam'
import { ArticleServiceSut } from './factory'

describe('Get Article', () => {
  let sut: ArticleServiceSut.Sut

  beforeEach(() => (sut = ArticleServiceSut.makeSut()))

  test('Should throw ArticleNotFound if article was not found', async () => {
    const { articleService } = sut

    const promise = articleService.get('invalid-id')

    await expect(promise).rejects.toThrowError(new ResourceNotFoundError())
  })

  test('Should return a valid article if the article was found', async () => {
    const { articleService, repository } = sut
    const params = mockArticleParams()
    repository.getResult = params

    const result = await articleService.get('valid id')

    expect(result.articleId).toBeDefined()
    expect(result.author.accountId).toBeDefined()
    expect(result.author.occupation).toBe('any occupation')
    expect(result.title).toBe('any title')
    expect(result.slug).toBe('any-title')
    expect(result.isPublished).toStrictEqual(false)
  })
})
