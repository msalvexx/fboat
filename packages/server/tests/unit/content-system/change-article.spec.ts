import { ResourceNotFoundError } from '@fboat/core/shared/models'
import { mockArticleParams } from '@/tests/mocks/content-system'
import { ArticleServiceSut } from './factory'

import MockDate from 'mockdate'

describe('Change Article', () => {
  let sut: ArticleServiceSut.Sut

  beforeEach(() => (sut = ArticleServiceSut.makeSut()))
  afterEach(() => MockDate.reset())

  test('Should throw ArticleNotFound if article was not found', async () => {
    const { articleService } = sut

    const promise = articleService.change({ idOrSlug: 'invalid-id' })

    await expect(promise).rejects.toThrowError(new ResourceNotFoundError())
  })

  test('Should modify the article found', async () => {
    const { articleService, repository } = sut
    const params = mockArticleParams()
    repository.getResult = params
    const changes = {
      isPublished: true,
      summary: 'new summary',
      title: 'hello pudim'
    }
    const publishDate = new Date()
    publishDate.setMilliseconds(0)
    MockDate.set(publishDate)

    const result = await articleService.change({
      idOrSlug: 'valid-id',
      ...changes
    })

    expect(result.articleId).toBeDefined()
    expect(result.author.accountId).toBeDefined()
    expect(result.summary).toBe(changes.summary)
    expect(result.title).toBe(changes.title)
    expect(result.isPublished).toBe(changes.isPublished)
    expect(result.publishDate).toStrictEqual(publishDate)
  })
})
