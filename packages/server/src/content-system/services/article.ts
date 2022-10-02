import { CreateArticle, GetArticle, UpdateArticle, createArticle, Article, ResourceNotFoundError, ArticleResult } from '@fboat/core'
import { GetArticleRepository, SaveArticleRepository } from '@/server/content-system/protocols'

export class ArticleService implements CreateArticle, GetArticle, UpdateArticle {
  constructor (
    private readonly repository: SaveArticleRepository & GetArticleRepository
  ) {}

  async create (params: CreateArticle.Params): Promise<CreateArticle.Result> {
    const article = createArticle(params)
    await this.repository.save(article)
    return this.toArticleResult(article)
  }

  async change ({ idOrSlug, ...params }: UpdateArticle.Params): Promise<UpdateArticle.Result> {
    const article = await this.getArticle(idOrSlug)
    article.changeArticle(params)
    await this.repository.save(article)
    return this.toArticleResult(article)
  }

  async get ({ idOrSlug }: GetArticle.Params): Promise<GetArticle.Result> {
    return this.toArticleResult(await this.getArticle(idOrSlug))
  }

  private async getArticle (idOrSlug: string): Promise<Article> {
    const articleParams = await this.repository.get(idOrSlug)
    if (articleParams === undefined) throw new ResourceNotFoundError()
    return new Article(articleParams)
  }

  private toArticleResult (article: Article): ArticleResult {
    return {
      articleId: article.articleId,
      author: {
        accountId: article.author.accountId,
        name: article.author.name,
        occupation: article.author.occupation,
        photo: article.author.photo
      },
      content: article.content,
      coverPhoto: article.coverPhoto,
      title: article.title,
      summary: article.summary,
      creationDate: article.creationDate,
      isPublished: article.isPublished,
      isFeatured: article.isFeatured,
      publishDate: article.publishDate,
      revisionDate: article.revisionDate,
      slug: article.slug
    }
  }
}
