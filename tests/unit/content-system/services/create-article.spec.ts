import { CreateArticle } from '@/content-system'
import { ArticleServiceSut } from './factory'

describe('Create Article', () => {
  let sut: ArticleServiceSut.Sut
  const params: CreateArticle.Params = {
    content: 'any content',
    summary: 'any summary',
    title: 'any title',
    coverPhoto: 'any photo',
    author: {
      accountId: '123',
      name: 'name other',
      occupation: 'any occupation'
    }
  }

  beforeEach(() => {
    sut = ArticleServiceSut.makeSut()
  })

  test('Should call default photo with author name', async () => {
    const { articleService, defaultPhotoServiceMock } = sut

    await articleService.create(params)

    expect(defaultPhotoServiceMock.params).toStrictEqual('name other')
  })

  test('Should store the correct article', async () => {
    const { articleService, defaultPhotoServiceMock, repository } = sut
    defaultPhotoServiceMock.result = 'no'

    await articleService.create(params)

    expect(repository.params.author.name).toBe('name other')
    expect(repository.params.author.occupation).toBe('any occupation')
    expect(repository.params.author.photo).toBe('no')
    expect(repository.params.content).toBe('any content')
    expect(repository.params.summary).toBe('any summary')
    expect(repository.params.title).toBe('any title')
    expect(repository.params.coverPhoto).toBe('any photo')
    expect(repository.params.slug).toBe('any-title')
    expect(repository.params.isPublished).toBe(false)
  })
})
