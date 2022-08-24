import { AuthorNotFoundError, GetArticleRepository, SaveArticleRepository, SlugAlreadyInUseError } from '@/content-system/domain'
import { MySQLConnectionManager } from '@/shared/infra'
import { MySQLArticle, MySQLAuthor } from '@/content-system/infra/repositories'

import { Repository } from 'typeorm'

export class MySQLArticleRepository implements SaveArticleRepository, GetArticleRepository {
  private readonly repo: Repository<MySQLArticle>
  private readonly authorRepo: Repository<MySQLAuthor>

  constructor (readonly connection: MySQLConnectionManager = MySQLConnectionManager.getInstance()) {
    this.repo = connection.getRepository(MySQLArticle)
    this.authorRepo = connection.getRepository(MySQLAuthor)
  }

  async save (params: SaveArticleRepository.Params): Promise<SaveArticleRepository.Result> {
    const articleBySlug = await this.repo.findOne({ where: { slug: params.slug } })
    if (articleBySlug !== null && articleBySlug.articleId !== params.articleId) throw new SlugAlreadyInUseError(params.slug)
    const retrievedArticle = await this.repo.findOne({ where: { articleId: params.articleId } })
    const data = {
      accountId: params.author.accountId,
      title: params.title,
      summary: params.summary,
      content: params.content,
      slug: params.slug,
      photo: params.coverPhoto,
      isFeatured: params.isFeatured,
      isPublished: params.isPublished,
      publishDate: params.publishDate,
      creationDate: params.creationDate,
      revisionDate: params.revisionDate
    }
    if (retrievedArticle === null) await this.repo.insert({ ...data, articleId: params.articleId })
    else {
      const author = await this.authorRepo.findOne({ where: { accountId: params.author.accountId } })
      if (author === null) throw new AuthorNotFoundError(params.author.accountId)
      await this.repo.update({ articleId: params.articleId }, data)
    }
  }

  async get (idOrSlug: string): Promise<GetArticleRepository.Result> {
    const dbArticle = await this.repo.findOne({
      where: [
        { articleId: idOrSlug },
        { slug: idOrSlug }
      ],
      relations: { account: true }
    })
    if (dbArticle === null) return undefined
    return {
      articleId: dbArticle.articleId,
      author: {
        accountId: dbArticle.account.accountId,
        name: `${dbArticle.account.firstName} ${dbArticle.account.lastName}`,
        occupation: dbArticle.account.occupation,
        photo: dbArticle.account.photo
      },
      content: dbArticle.content,
      coverPhoto: dbArticle.photo,
      summary: dbArticle.summary,
      title: dbArticle.title,
      creationDate: dbArticle.creationDate,
      isFeatured: dbArticle.isFeatured,
      isPublished: dbArticle.isPublished,
      publishDate: dbArticle.publishDate,
      revisionDate: dbArticle.revisionDate,
      slug: dbArticle.slug
    }
  }
}
