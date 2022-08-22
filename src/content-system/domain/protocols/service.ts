import { Article } from '@/content-system'

type AuthorParams = {
  accountId: string
  name: string
  occupation: string
  photo: string
}

type ArticleParams = {
  title: string
  content: string
  summary: string
  author: AuthorParams
  coverPhoto: string
  slug?: string
}

export type ArticleResult = Article.Params

export namespace CreateArticle {
  export type Params = ArticleParams
  export type Result = ArticleResult
}

export interface CreateArticle {
  create: (params: CreateArticle.Params) => Promise<CreateArticle.Result>
}

export namespace UpdateArticle {
  export type Params = Partial<ArticleParams & { isPublished: boolean }> & { id: string }

  export type Result = ArticleResult
}

export interface UpdateArticle {
  change: (params: UpdateArticle.Params) => Promise<UpdateArticle.Result>
}

export namespace GetArticle {
  export type Result = ArticleResult
}

export interface GetArticle {
  get: (idOrSlug: string) => Promise<GetArticle.Result>
}
