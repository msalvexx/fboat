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
    defaultCoverPhoto: string
    creationDate?: Date
    publishDate?: Date
    revisionDate?: Date
  }
}

class Article {
  readonly articleId: string
  private _author: Author
  private _title: string
  private _summary: string
  private _content: string
  private _isPublished: boolean
  private _coverPhoto?: string
  private readonly defaultCoverPhoto: string
  private _revisionDate: Date
  readonly creationDate: Date
  private _publishDate?: Date

  constructor (params: Article.Params) {
    const { title, author, summary, content, isPublished, coverPhoto, creationDate, publishDate, revisionDate, defaultCoverPhoto } = params
    const now = new Date()
    now.setMilliseconds(0)
    this._title = title
    this._author = new Author(author)
    this._summary = summary
    this._content = content
    this._isPublished = isPublished ?? false
    this.creationDate = creationDate ?? now
    this._revisionDate = revisionDate ?? now
    this._publishDate = publishDate
    this._coverPhoto = coverPhoto
    this.defaultCoverPhoto = defaultCoverPhoto
  }

  changeArticle (params: Partial<Article.Params>): void {
    const { title, author, summary, content, isPublished, coverPhoto } = params
    const now = new Date()
    now.setMilliseconds(0)
    this._title = title ?? this._title
    this._author = author !== undefined ? new Author(author) : this._author
    this._summary = summary ?? this._summary
    this._content = content ?? this._content
    this._coverPhoto = coverPhoto ?? this._coverPhoto
    this._revisionDate = now
    if (isPublished === undefined) return
    this._isPublished = isPublished ?? this._isPublished
    if (this._isPublished) this._publishDate = now
  }

  get title (): string {
    return this._title
  }

  get author (): Author {
    return this._author
  }

  get summary (): string {
    return this._summary
  }

  get content (): string {
    return this._content
  }

  get isPublished (): boolean {
    return this._isPublished
  }

  get coverPhoto (): string {
    return this._coverPhoto ?? this.defaultCoverPhoto
  }

  get publishDate (): Date | undefined {
    return this._publishDate
  }

  get revisionDate (): Date | undefined {
    return this._revisionDate
  }
}

describe('Article', () => {
  let sut: Article

  beforeEach(() => {
    sut = new Article({
      articleId: '123',
      title: 'any title',
      author: {
        accountId: '123',
        name: 'any name',
        occupation: 'any occupation'
      },
      content: '<html></html>',
      summary: 'any summary',
      coverPhoto: 'any',
      defaultCoverPhoto: 'defaultPhoto'
    })
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
})
