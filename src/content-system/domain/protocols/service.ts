type AuthorResult = {
  firstName: string
  lastName: string
  occupation: string
  photo: string
}

type AuthorParams = {
  firstName: string
  lastName: string
  occupation: string
}

type ArticleResult = {
  title: string
  author: AuthorResult
  summary: string
  content: string
  coverPhoto: string
  isPublished: boolean
  creationDate: Date
  publishDate: Date
  revisionDate: Date
}

type ArticleParams = {
  title: string
  content: string
  summary: string
  author: AuthorParams
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
    authorId: string
    coverPhoto: string
    isPublished: boolean
  }

  export type Result = ArticleResult
}

export interface UpdateArticle {
  save: (params: UpdateArticle.Params) => Promise<UpdateArticle.Result>
}
