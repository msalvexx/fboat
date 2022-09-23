import { ResourceNotFoundError, SlugAlreadyInUseError, AuthorNotFoundError } from '@fboat/core'
import { SaveArticleRepository, GetArticleRepository, ListArticlesRepository, RemoveArticleRepository } from '@/server/content-system/protocols'
import { MySQLConnectionManager } from '@/server/shared/infra'
import { MySQLArticle, MySQLAuthor } from '@/server/content-system/infra/repositories'

import { Repository } from 'typeorm'

export class MySQLArticleRepository implements SaveArticleRepository, GetArticleRepository, ListArticlesRepository, RemoveArticleRepository {
  private readonly repo: Repository<MySQLArticle>
  private readonly authorRepo: Repository<MySQLAuthor>

  constructor (readonly connection: MySQLConnectionManager = MySQLConnectionManager.getInstance()) {
    this.repo = connection.getRepository(MySQLArticle)
    this.authorRepo = connection.getRepository(MySQLAuthor)
  }

  async remove ({ idOrSlug }: RemoveArticleRepository.Params): Promise<void> {
    const dbArticle = await this.repo.findOne({
      where: [
        { articleId: idOrSlug },
        { slug: idOrSlug }
      ],
      relations: { account: true }
    })
    if (dbArticle === null) throw new ResourceNotFoundError()
    await this.repo.remove(dbArticle)
  }

  async fetchPage (params: ListArticlesRepository.Params = ListArticlesRepository.Default): Promise<ListArticlesRepository.Result> {
    const size = params.pageSize ?? ListArticlesRepository.Default.pageSize
    const number = params.pageNumber ?? ListArticlesRepository.Default.pageNumber
    const isFeatured = params.isFeatured ?? ListArticlesRepository.Default.isFeatured
    const isPublished = params.isPublished ?? ListArticlesRepository.Default.isPublished
    const mostRecent = params.mostRecent ?? ListArticlesRepository.Default.mostRecent
    const articles = await this.repo.find({
      where: {
        isFeatured,
        isPublished,
        ...(params.authorId && { accountId: params.authorId })
      },
      order: {
        ...(mostRecent && { publishDate: 'desc' })
      },
      take: size,
      skip: number - 1
    })
    return {
      items: articles.map(x => ({
        articleId: x.articleId,
        author: {
          accountId: x.account.accountId,
          name: `${x.account.firstName} ${x.account.lastName}`,
          occupation: x.account.occupation,
          photo: x.account.photo ?? ''
        },
        coverPhoto: x.photo,
        slug: x.slug,
        title: x.title,
        summary: x.summary,
        publishDate: x.publishDate,
        isFeatured: x.isFeatured,
        isPublished: x.isPublished
      })),
      page: {
        number,
        size
      }
    }
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
