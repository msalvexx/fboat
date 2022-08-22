import { Article } from '@/content-system'
import { ResourceNotFoundError } from '@/iam'
import { ArticleServiceSut } from './factory'

describe('Get Article', () => {
  let sut: ArticleServiceSut.Sut

  beforeEach(() => {
    sut = ArticleServiceSut.makeSut()
  })

  test('Should throw ArticleNotFound if article was not found', async () => {
    const { articleService } = sut

    const promise = articleService.get('invalid-id')

    await expect(promise).rejects.toThrowError(new ResourceNotFoundError())
  })

  test('Should return a valid article if the article was found', async () => {
    const { articleService, repository } = sut
    const params = {
      articleId: 'any id',
      content: 'any content',
      summary: 'any summary',
      title: 'any title',
      coverPhoto: 'any photo',
      author: {
        accountId: '123',
        name: 'name other',
        occupation: 'any occupation',
        photo: 'any photo',
        defaultPhoto: null
      }
    }
    repository.getResult = params

    const result = await articleService.get('valid id')

    expect(result).toStrictEqual(new Article(params))
  })
})
