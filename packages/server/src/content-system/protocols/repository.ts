type Author = {
  name: string
  accountId: string
  occupation: string
  photo: string | null
}

type Article = {
  articleId: string
  creationDate: Date
  title: string
  author: Author
  summary: string
  content: string
  isPublished: boolean
  isFeatured: boolean
  coverPhoto: string
  slug: string
  publishDate: Date | undefined
  revisionDate: Date
}

export namespace SaveArticleRepository {
  export type Params = Article
  export type Result = Promise<void>
}

export interface SaveArticleRepository {
  save: (params: SaveArticleRepository.Params) => Promise<SaveArticleRepository.Result>
}

export namespace GetArticleRepository {
  export type Params = string
  export type Result = Article | undefined
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

  type Author = {
    accountId: string
    name: string
    occupation: string
    photo: string
  }

  type Article = {
    articleId: string,
    author: Author,
    coverPhoto: string,
    slug: string,
    title: string,
    summary: string,
    publishDate: Date,
    isFeatured: boolean,
    isPublished: boolean
  }

  export type Result = {
    items: Array<Partial<Article>>
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
