import { ResourceNotFoundError } from '@fboat/core/shared/models'
import { Article, AuthorNotFoundError, SlugAlreadyInUseError } from '@fboat/core/content-system/models'
import { MySQLArticle, MySQLArticleRepository } from '@/server/content-system/infra'
import { MySQLConnectionManager } from '@/server/shared/infra'

import { mockArticle } from '@/tests/mocks/content-system'
import { refreshDatabase, getConnectionManager } from '@/tests/integration/configs/helpers.integration'

import { Repository } from 'typeorm'

describe('ArticleRepository', () => {
  let sut: MySQLArticleRepository
  let connectionManager: MySQLConnectionManager
  let repository: Repository<MySQLArticle>
  let params: Article

  const insertOnDatabase = async (params: Article): Promise<void> => {
    await repository.save({
      articleId: params.articleId,
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
    })
  }

  beforeAll(async () => {
    connectionManager = await getConnectionManager()
    repository = connectionManager.getRepository(MySQLArticle)
    sut = new MySQLArticleRepository(connectionManager)
  })

  beforeEach(async () => {
    await refreshDatabase(connectionManager)
    params = mockArticle()
  })
  afterAll(async () => await connectionManager.disconnect())

  describe('Save', () => {
    beforeEach(async () => {
      await refreshDatabase(connectionManager)
      params = mockArticle()
    })

    test('Will throw when slug already exists', async () => {
      params.changeArticle({ slug: 'artigo-1' })

      const promise = sut.save(params)

      await expect(promise).rejects.toThrow(new SlugAlreadyInUseError('artigo-1'))
    })

    test('Will throw if author not exists', async () => {
      await insertOnDatabase(params)

      params.changeArticle({
        author: {
          accountId: '123',
          photo: 'any-photo',
          name: 'any-name',
          occupation: 'bla'
        }
      })

      const promise = sut.save(params)

      await expect(promise).rejects.toThrow(new AuthorNotFoundError(params.author.accountId))
    })

    test('Can create article successfully', async () => {
      await sut.save(params)

      const retrievedArticle = await repository.findOne({ where: { articleId: '123' } })
      expect(retrievedArticle).toBeDefined()
      expect(retrievedArticle?.accountId).toBe(params.author.accountId)
      expect(retrievedArticle?.content).toBe(params.content)
      expect(retrievedArticle?.photo).toBe(params.coverPhoto)
      expect(retrievedArticle?.summary).toBe(params.summary)
      expect(retrievedArticle?.title).toBe(params.title)
      expect(retrievedArticle?.isPublished).toBe(params.isPublished)
      expect(retrievedArticle?.slug).toBe(params.slug)
    })

    test('Can update article successfully', async () => {
      await insertOnDatabase(params)

      params.changeArticle({
        title: 'other title',
        slug: 'other-title'
      })

      await sut.save(params)

      const retrievedArticle = await repository.findOne({ where: { articleId: '123' } })
      expect(retrievedArticle).toBeDefined()
      expect(retrievedArticle?.title).toBe(params.title)
      expect(retrievedArticle?.slug).toBe(params.slug)
    })
  })

  describe('Get', () => {
    test('Will return undefined if article was not found', async () => expect(await sut.get('invalid-id')).toBeUndefined())
    test('Will return a valid article if a valid slug was provided', async () => expect(await sut.get('artigo-1')).toBeDefined())
    test('Will return a valid article if a valid article id was provided', async () => expect(await sut.get('6b1eec7e-ac93-4fb6-8924-0327a750b1e6')).toBeDefined())
    test('Will return the attributes correctly', async () => {
      const retrievedArticle = await sut.get('artigo-1')

      expect(retrievedArticle?.slug).toBe('artigo-1')
      expect(retrievedArticle?.author.name).toBe('Paula Passos Menezes')
      expect(retrievedArticle?.author.occupation).toBe('Engenheira Elétrica')
    })
  })

  describe('fetchPage', () => {
    test('Will fetch the correct page ', async () => {
      const articles = await sut.fetchPage({
        pageSize: 1,
        pageNumber: 2
      })

      expect(articles.page.size).toBe(1)
      expect(articles.page.number).toBe(2)
      expect(articles.items.length).toBe(1)
      expect(articles.items.at(0)?.articleId).toBe('74ed31a1-2877-4763-8c53-9956645e5f2c')
    })

    test('Will filter articles by isFeatured', async () => {
      const articles = await sut.fetchPage({
        isFeatured: false
      })

      expect(articles.items.length).toBe(2)
    })

    test('Will filter articles by author', async () => {
      const articles = await sut.fetchPage({
        authorId: 'c77f7d99-c956-4dd2-a63f-b7a1ca6f28aa'
      })

      expect(articles.items.length).toBe(0)
    })
  })

  describe('remove', () => {
    test('Will return error if article was not found', async () => {
      const promise = sut.remove({ idOrSlug: 'any-id' })

      await expect(promise).rejects.toThrow(new ResourceNotFoundError())
    })

    test('Will remove article if id or slug is provided', async () => {
      const articleId = '6b1eec7e-ac93-4fb6-8924-0327a750b1e6'

      await sut.remove({ idOrSlug: articleId })

      await expect(repository.findOne({ where: { articleId } })).resolves.toBeNull()
    })
  })
})
