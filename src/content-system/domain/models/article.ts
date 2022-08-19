import { Author } from './author'

export namespace Article {
  export type Params = {
    articleId: string
    author: Author.Params
    title: string
    summary: string
    content: string
    isPublished?: boolean
    coverPhoto: string
    creationDate?: Date
    publishDate?: Date
    revisionDate?: Date
    slug?: string
  }
}

export class Article {
  readonly articleId: string
  private _author: Author
  private _title: string
  private _summary: string
  private _content: string
  private _isPublished: boolean
  private _coverPhoto: string
  private _revisionDate: Date
  readonly creationDate: Date
  private _publishDate?: Date
  readonly slug: string

  constructor (params: Article.Params) {
    const { articleId, title, author, summary, content, isPublished, coverPhoto, creationDate, publishDate, revisionDate, slug } = params
    const now = new Date()
    now.setMilliseconds(0)
    this.articleId = articleId
    this._title = title
    this._author = new Author(author)
    this._summary = summary
    this._content = content
    this._isPublished = isPublished ?? false
    this.creationDate = creationDate ?? now
    this._revisionDate = revisionDate ?? now
    this._publishDate = publishDate
    this._coverPhoto = coverPhoto
    this.slug = slug ?? title.toLowerCase().replace(' ', '-')
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
    return this._coverPhoto
  }

  get publishDate (): Date | undefined {
    return this._publishDate
  }

  get revisionDate (): Date {
    return this._revisionDate
  }
}
