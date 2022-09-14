type AuthorParams = {
  accountId: string
  name: string
  occupation: string
  photo: string
}

export type ArticleParams = {
  title: string
  content: string
  summary: string
  author: AuthorParams
  coverPhoto: string
  slug?: string
}

type AuthorResult = {
  name: string
  accountId: string
  occupation: string
  photo: string | null
}

export type ArticleResult = {
  articleId: string
  creationDate: Date
  title: string
  author: AuthorResult
  summary: string
  content: string
  isPublished: boolean
  isFeatured: boolean
  coverPhoto: string
  slug: string
  publishDate: Date | undefined
  revisionDate: Date
}
