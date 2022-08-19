import { CreateArticle } from '@/content-system'

export namespace GetDefaultPhoto {
  export type Params = {
    firstName: string
    lastName: string
  }

  export type Result = string
}

export interface GetDefaultPhoto {
  get: (params: GetDefaultPhoto.Params) => Promise<GetDefaultPhoto.Result>
}

export class GetDefaultPhotoMock implements GetDefaultPhoto {
  error: boolean = false
  params: any

  async get (params: GetDefaultPhoto.Params): Promise<GetDefaultPhoto.Result> {
    if (this.error) throw new Error()
    this.params = params
    return `${params.firstName} ${params.lastName}`
  }
}

class ArticleService implements CreateArticle {
  constructor (private readonly defaultPhotoProvider: GetDefaultPhoto) {}

  async create (params: CreateArticle.Params): Promise<CreateArticle.Result> {
    await this.defaultPhotoProvider.get({
      firstName: params.author.firstName,
      lastName: params.author.lastName
    })
    return null as any
  }
}
type Sut = {
  articleService: ArticleService
  defaultPhotoServiceMock: GetDefaultPhotoMock
}

const makeSut = (): Sut => {
  const defaultPhotoServiceMock = new GetDefaultPhotoMock()
  return {
    articleService: new ArticleService(defaultPhotoServiceMock),
    defaultPhotoServiceMock
  }
}

describe('Create Article', () => {
  let sut: Sut

  beforeEach(() => {
    sut = makeSut()
  })

  test('Should call default photo with author name', async () => {
    const { articleService, defaultPhotoServiceMock } = sut

    await articleService.create({
      content: 'any content',
      summary: 'any summary',
      title: 'any title',
      author: {
        firstName: 'any name',
        lastName: 'other name',
        occupation: 'any occupation'
      }
    })

    expect(defaultPhotoServiceMock.params).toStrictEqual({
      firstName: 'any name',
      lastName: 'other name'
    })
  })
})
