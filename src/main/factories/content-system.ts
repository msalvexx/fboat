import { MySQLArticleRepository } from '@/content-system/infra'
import { ArticleService } from '@/content-system/services'
import { Handler } from '@/shared/domain/protocols/middleware'
import { HandlerBuilder } from './builder'

const makeArticleRepository = (): MySQLArticleRepository => new MySQLArticleRepository()
const makeArticleService = (): ArticleService => new ArticleService(makeArticleRepository())

export const makeGetArticle = (): Handler => {
  const service = makeArticleService()
  return HandlerBuilder
    .of(service)
    .service(service.get)
}

export const makeCreateArticle = (): Handler => {
  const service = makeArticleService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('CreateArticle')
    .accountToAuthor()
    .service(service.create)
}

export const makeChangeArticle = (): Handler => {
  const service = makeArticleService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('ChangeArticle')
    .accountToAuthor()
    .service(service.change)
}

export const makeListArticles = (): Handler => {
  const repository = makeArticleRepository()
  return HandlerBuilder
    .of(repository)
    .service(repository.fetchPage)
}
