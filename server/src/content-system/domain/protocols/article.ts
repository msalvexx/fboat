import { Article } from '@/content-system/domain'

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

export type ArticleResult = Article.Params
