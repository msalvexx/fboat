import { Article } from '@/content-system/domain'

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
  type AdditionalFields = {
    isPublished: boolean
    isFeatured: boolean
  }

  export type Params = Partial<ArticleParams & AdditionalFields> & { idOrSlug: string }

  export type Result = ArticleResult
}

export interface UpdateArticle {
  change: (params: UpdateArticle.Params) => Promise<UpdateArticle.Result>
}

export namespace GetArticle {
  export type Params = { idOrSlug: string }
  export type Result = ArticleResult
}

export interface GetArticle {
  get: (idOrSlug: GetArticle.Params) => Promise<GetArticle.Result>
}

export namespace SaveAttachment {
  export type Params = {
    file: Buffer
    extension: string
  }
  export type Result = {
    url: string
    fileName: string
  }
}

export interface SaveAttachment {
  save: (file: SaveAttachment.Params) => Promise<SaveAttachment.Result>
}

export namespace RemoveAttachment {
  export type Params = {
    fileName: string
  }
}

export interface RemoveAttachment {
  remove: (params: RemoveAttachment.Params) => Promise<void>
}
