export type Author = {
  accountId: string
  name: string
  occupation: string
  photo: string
}

export type Article = {
  articleId: string
  author: Author
  coverPhoto: string
  slug: string
  title: string
  summary: string
  publishDate: Date
  isFeatured: boolean
  isPublished: boolean
}
