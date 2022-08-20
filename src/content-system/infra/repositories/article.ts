import { SaveArticleRepository } from '@/content-system/domain'
import { MySQLConnectionManager } from '@/shared/infra'
import { MySQLArticle } from '@/content-system/infra/repositories'

import { Repository } from 'typeorm'

export class MySQLArticleRepository implements SaveArticleRepository {
  private readonly repo: Repository<MySQLArticle>

  constructor (readonly connection: MySQLConnectionManager = MySQLConnectionManager.getInstance()) {
    this.repo = connection.getRepository(MySQLArticle)
  }

  async save (params: SaveArticleRepository.Params): Promise<SaveArticleRepository.Result> {
    const retrievedArticle = await this.repo.findOne({ where: { articleId: params.articleId } })
    const data = {
      accountId: params.author.accountId,
      title: params.title,
      summary: params.summary,
      content: params.content,
      slug: params.slug,
      photo: params.coverPhoto,
      isPublished: params.isPublished,
      publishDate: params.publishDate,
      creationDate: params.creationDate,
      revisionDate: params.revisionDate
    }
    if (retrievedArticle === null) await this.repo.insert({ ...data, articleId: params.articleId })
    else await this.repo.update({ articleId: params.articleId }, data)
  }
}
