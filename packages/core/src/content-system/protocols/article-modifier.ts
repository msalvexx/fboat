import { ArticleResult, ArticleParams } from '../../content-system/protocols'

export namespace CreateArticle {
  export type Params = ArticleParams
  export type Result = ArticleResult
}

export interface CreateArticle {
  create: (params: CreateArticle.Params) => Promise<CreateArticle.Result>
}

export namespace UpdateArticle {
  type AdditionalFields = { isPublished: boolean, isFeatured: boolean }
  export type Params = Partial<ArticleParams & AdditionalFields> & { idOrSlug: string }
  export type Result = ArticleResult
}

export interface UpdateArticle {
  change: (params: UpdateArticle.Params) => Promise<UpdateArticle.Result>
}
