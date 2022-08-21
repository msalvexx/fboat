import { AvatarPhotoProvider, CreateArticle, GetArticle, GetArticleRepository, SaveArticleRepository } from '@/content-system/domain'
import { createArticle } from '@/content-system/domain/models/factory'
import { ResourceNotFoundError } from '@/iam'

export class ArticleService implements CreateArticle, GetArticle {
  constructor (
    private readonly avatarPhotoProvider: AvatarPhotoProvider,
    private readonly repository: SaveArticleRepository & GetArticleRepository
  ) {}

  async create (params: CreateArticle.Params): Promise<CreateArticle.Result> {
    const defaultAuthorAvatar = await this.avatarPhotoProvider.get(params.author.name)
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

  async get (idOrSlug: string): Promise<GetArticle.Result> {
    const articleParams = await this.repository.get(idOrSlug)
    if (articleParams === undefined) throw new ResourceNotFoundError()
    return null as any
  }
}
