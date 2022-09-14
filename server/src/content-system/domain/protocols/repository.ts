import { ArticleParams, ArticleResult } from '@/content-system/domain/protocols'

export namespace SaveArticleRepository {
  export type Params = ArticleResult
  export type Result = Promise<void>
}

export interface SaveArticleRepository {
  save: (params: SaveArticleRepository.Params) => Promise<SaveArticleRepository.Result>
}

export namespace GetArticleRepository {
  export type Params = string
  export type Result = ArticleResult | undefined
}

export interface GetArticleRepository {
  get: (id: GetArticleRepository.Params) => Promise<GetArticleRepository.Result>
}

export namespace ListArticlesRepository {
  export type Page = { size: number, number: number }

  export type Params = Partial<{
    pageSize: number
    pageNumber: number
    mostRecent: boolean
    authorId: string
    isFeatured: boolean
    isPublished: boolean
  }>

  export type Result = {
    items: Array<Partial<ArticleParams>>
    page: Page
  }

  export const Default = {
    isFeatured: false,
    isPublished: true,
    mostRecent: true,
    pageNumber: 1,
    pageSize: 10
  }
}

export interface ListArticlesRepository {
  fetchPage: (params: ListArticlesRepository.Params) => Promise<ListArticlesRepository.Result>
}

export namespace RemoveArticleRepository {
  export type Params = { idOrSlug: string }
  export type Result = void
}

export interface RemoveArticleRepository {
  remove: (params: RemoveArticleRepository.Params) => Promise<RemoveArticleRepository.Result>
}
