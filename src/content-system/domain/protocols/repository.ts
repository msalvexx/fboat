import { Article } from '@/content-system'

export namespace SaveArticleRepository {
  export type Params = Article
  export type Result = Promise<void>
}

export interface SaveArticleRepository {
  save: (params: SaveArticleRepository.Params) => Promise<SaveArticleRepository.Result>
}

export namespace GetArticleRepository {
  export type Params = string
  export type Result = Article.Params | undefined
}

export interface GetArticleRepository {
  get: (id: GetArticleRepository.Params) => Promise<GetArticleRepository.Result>
}
