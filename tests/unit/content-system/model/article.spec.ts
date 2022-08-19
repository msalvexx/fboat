export namespace Author {
  export type Params = {
    accountId: string
    name: string
    occupation: string
  }
}

class Author {
  readonly name: string
  readonly accountId: string
  readonly occupation: string

  constructor (params: Author.Params) {
    const { accountId, name, occupation } = params
    this.accountId = accountId
    this.name = name
    this.occupation = occupation
  }
}

export namespace Article {
  export type Params = {
    articleId: string
    author: Author.Params
    title: string
    summary: string
    content: string
    isPublished?: boolean
    coverPhoto?: string
    creationDate?: Date
    publishDate?: Date
    revisionDate?: Date
  }
}

class Article {
  readonly articleId: string
  readonly author: Author
  readonly title: string
  readonly summary: string
  readonly content: string
  readonly isPublished: boolean
  readonly creationDate: Date
  readonly revisionDate: Date
  readonly coverPhoto?: string
  readonly publishDate?: Date

  constructor (params: Article.Params) {
    const { title, author, summary, content, isPublished, coverPhoto, creationDate, publishDate, revisionDate } = params
    const now = new Date()
    now.setMilliseconds(0)
    this.title = title
    this.author = new Author(author)
    this.summary = summary
    this.content = content
    this.isPublished = isPublished ?? false
    this.creationDate = creationDate ?? now
    this.revisionDate = revisionDate ?? now
    this.publishDate = publishDate
    this.coverPhoto = coverPhoto
  }
}

describe('Article', () => {
  test('Should create article in unpublished state', () => {
    const sut = new Article({
      articleId: '123',
      title: 'any title',
      author: {
        accountId: '123',
        name: 'any name',
        occupation: 'any occupation'
      },
      content: '<html></html>',
      summary: 'any summary'
    })

    expect(sut.isPublished).toBeFalsy()
  })
})
