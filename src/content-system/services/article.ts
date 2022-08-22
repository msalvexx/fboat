import { Article, CreateArticle, GetArticle, GetArticleRepository, SaveArticleRepository, UpdateArticle } from '@/content-system/domain'
import { createArticle } from '@/content-system/domain/models/factory'
import { ResourceNotFoundError } from '@/iam'

export class ArticleService implements CreateArticle, GetArticle, UpdateArticle {
  constructor (
    private readonly repository: SaveArticleRepository & GetArticleRepository
  ) {}

  async create (params: CreateArticle.Params): Promise<CreateArticle.Result> {
    const article = createArticle(params)
    await this.repository.save(article)
    return article
  }

  async change (params: UpdateArticle.Params): Promise<Article> {
    const article = await this.getArticle(params.id)
    article.changeArticle(params)
    return article
  }

  async get (idOrSlug: string): Promise<GetArticle.Result> {
    return await this.getArticle(idOrSlug)
  }

  private async getArticle (idOrSlug: string): Promise<Article> {
    const articleParams = await this.repository.get(idOrSlug)
    if (articleParams === undefined) throw new ResourceNotFoundError()
    return new Article(articleParams)
  }
}
