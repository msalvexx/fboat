import { Article, CreateArticle } from '@/content-system'
import { createArticle } from '@/content-system/domain/models/factory'

export namespace GetDefaultPhoto {
  export type Params = string
  export type Result = string
}

export interface GetDefaultPhoto {
  get: (params: GetDefaultPhoto.Params) => Promise<GetDefaultPhoto.Result>
}

export namespace SaveArticleRepository {
  export type Params = Article
  export type Result = Promise<void>
}

export interface SaveArticleRepository {
  save: (params: SaveArticleRepository.Params) => Promise<SaveArticleRepository.Result>
}

export class SaveArticleRepositoryMock implements SaveArticleRepository {
  params: SaveArticleRepository.Params

  async save (params: SaveArticleRepository.Params): Promise<SaveArticleRepository.Result> {
    this.params = params
  }
}

export class GetDefaultPhotoMock implements GetDefaultPhoto {
  error: boolean = false
  params: any
  result: string = 'any'

  async get (name: GetDefaultPhoto.Params): Promise<GetDefaultPhoto.Result> {
    if (this.error) throw new Error()
    this.params = name
    return this.result
  }
}

class ArticleService implements CreateArticle {
  constructor (
    private readonly defaultPhotoProvider: GetDefaultPhoto,
    private readonly repository: SaveArticleRepository
  ) {}

  async create (params: CreateArticle.Params): Promise<CreateArticle.Result> {
    const defaultAuthorAvatar = await this.defaultPhotoProvider.get(params.author.name)
    const article = createArticle(params, defaultAuthorAvatar)
    await this.repository.save(article)
    return {
      author: article.author,
      content: article.content,
      coverPhoto: article.coverPhoto,
      creationDate: article.creationDate,
      isPublished: article.isPublished,
      revisionDate: article.revisionDate,
      summary: article.summary,
      title: article.title
    }
  }
}
type Sut = {
  articleService: ArticleService
  defaultPhotoServiceMock: GetDefaultPhotoMock
  repository: SaveArticleRepositoryMock
}

const makeSut = (): Sut => {
  const repository = new SaveArticleRepositoryMock()
  const defaultPhotoServiceMock = new GetDefaultPhotoMock()
  return {
    articleService: new ArticleService(defaultPhotoServiceMock, repository),
    defaultPhotoServiceMock,
    repository
  }
}

describe('Create Article', () => {
  let sut: Sut
  const params: CreateArticle.Params = {
    content: 'any content',
    summary: 'any summary',
    title: 'any title',
    coverPhoto: 'any photo',
    author: {
      accountId: '123',
      name: 'name other',
      occupation: 'any occupation'
    }
  }

  beforeEach(() => {
    sut = makeSut()
  })

  test('Should call default photo with author name', async () => {
    const { articleService, defaultPhotoServiceMock } = sut

    await articleService.create(params)

    expect(defaultPhotoServiceMock.params).toStrictEqual('name other')
  })

  test('Should store the correct article', async () => {
    const { articleService, defaultPhotoServiceMock, repository } = sut
    defaultPhotoServiceMock.result = 'no'

    await articleService.create(params)

    expect(repository.params.author.name).toBe('name other')
    expect(repository.params.author.occupation).toBe('any occupation')
    expect(repository.params.author.photo).toBe('no')
    expect(repository.params.content).toBe('any content')
    expect(repository.params.summary).toBe('any summary')
    expect(repository.params.title).toBe('any title')
    expect(repository.params.coverPhoto).toBe('any photo')
    expect(repository.params.slug).toBe('any-title')
    expect(repository.params.isPublished).toBe(false)
  })
})
