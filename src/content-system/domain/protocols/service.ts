type ArticleResult = {
  title: string
  author: string
  summary: string
  content: string
  coverPhoto: string
  isPublished: boolean
  publishDate: Date
  updateDate: Date
}

type ArticleParams = {
  title: string
  content: string
  summary: string
}

export namespace CreateArticle {
  export type Params = ArticleParams
  export type Result = ArticleResult
}

export interface CreateArticle {
  create: (params: CreateArticle.Params) => Promise<CreateArticle.Result>
}

export namespace UpdateArticle {
  export type Params = ArticleParams & {
    author: string
    coverPhoto: string
    isPublished: boolean
  }

  export type Result = ArticleResult
}

export interface UpdateArticle {
  save: (params: UpdateArticle.Params) => Promise<UpdateArticle.Result>
}
