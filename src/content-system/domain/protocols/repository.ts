import { Article } from '@/content-system'

export namespace SaveArticleRepository {
  export type Params = Article
  export type Result = Promise<void>
}

export interface SaveArticleRepository {
  save: (params: SaveArticleRepository.Params) => Promise<SaveArticleRepository.Result>
}
