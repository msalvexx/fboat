import { Article } from '@/content-system/domain/models'

describe('Article', () => {
  let sut: Article
  const params: Article.Params = {
    articleId: '123',
    title: 'Any Title',
    author: {
      accountId: '123',
      name: 'any name',
      occupation: 'any occupation',
      defaultPhoto: 'default photo'
    },
    content: '<html></html>',
    summary: 'any summary',
    coverPhoto: 'photo'
  }

  beforeEach(() => {
    sut = new Article(params)
  })

  test('Should create article in unpublished state', () => {
    expect(sut.isPublished).toBeFalsy()
  })

  test('Should change article', () => {
    const oldDate = sut.revisionDate

    sut.changeArticle({
      content: 'other content',
      isPublished: true,
      coverPhoto: 'any photo'
    })

    expect(sut.isPublished).toBeTruthy()
    expect(sut.revisionDate).not.toBe(oldDate)
    expect(sut.publishDate).toBe(sut.revisionDate)
    expect(sut.coverPhoto).toBe('any photo')
    expect(sut.content).toBe('other content')
  })

  test('Should return default photo if no photo is provided', () => {
    expect(sut.author.photo).toBe('default photo')
  })

  test('Should return a new photo if photo is set', () => {
    sut.changeArticle({
      author: {
        accountId: '123',
        defaultPhoto: 'default photo',
        name: 'any name',
        occupation: 'any occupation',
        photo: 'new photo'
      }
    })

    expect(sut.author.photo).toBe('new photo')
  })

  test('Should return a default slug if slug was not set', () => {
    expect(sut.slug).toBe('any-title')
  })
})
