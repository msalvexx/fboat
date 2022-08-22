import { Article } from "@/content-system"

type AuthorParams = {
  accountId: string
  name: string
  occupation: string
}

type ArticleParams = {
  title: string
  content: string
  summary: string
  author: AuthorParams
  coverPhoto: string
}

type ArticleResult = Article

export namespace CreateArticle {
  export type Params = ArticleParams
  export type Result = ArticleResult
}

export interface CreateArticle {
  create: (params: CreateArticle.Params) => Promise<CreateArticle.Result>
}

export namespace UpdateArticle {
  export type Params = ArticleParams & {
    authorId: string
    coverPhoto: string
    isPublished: boolean
  }

  export type Result = ArticleResult
}

export interface UpdateArticle {
  save: (params: UpdateArticle.Params) => Promise<UpdateArticle.Result>
}

export namespace GetArticle {
  export type Result = ArticleResult
}

export interface GetArticle {
  get: (idOrSlug: string) => Promise<GetArticle.Result>
}
