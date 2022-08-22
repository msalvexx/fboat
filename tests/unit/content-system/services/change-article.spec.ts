import { ResourceNotFoundError } from '@/iam'
import { ArticleServiceSut } from './factory'

describe('Change Article', () => {
  let sut: ArticleServiceSut.Sut

  beforeEach(() => {
    sut = ArticleServiceSut.makeSut()
  })

  test('Should throw ArticleNotFound if article was not found', async () => {
    const { articleService } = sut

    const promise = articleService.change({ id: 'invalid-id' })

    await expect(promise).rejects.toThrowError(new ResourceNotFoundError())
  })
})
