import { MySQLArticleRepository } from '@/content-system/infra'
import { ArticleService } from '@/content-system/services'
import { Handler } from '@/shared/domain/protocols/middleware'
import { makeAccountToAuthorMapperHandler, makeAuthorizationHandler, makeServiceHandler, makeTokenCertifierHandler } from './shared'

const makeArticleRepository = (): MySQLArticleRepository => new MySQLArticleRepository()
const makeArticleService = (): ArticleService => new ArticleService(makeArticleRepository())

export const makeGetArticle = (): Handler => {
  const service = makeArticleService()
  const handler = makeTokenCertifierHandler()
  handler.setNext(makeServiceHandler(service.get, service))
  return handler
}

export const makeCreateArticle = (): Handler => {
  const service = makeArticleService()
  const handler1 = makeTokenCertifierHandler()
  const handler2 = makeAuthorizationHandler('CreateArticle')
  const handler3 = makeAccountToAuthorMapperHandler()
  const handler4 = makeServiceHandler(service.create, service)
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  handler3.setNext(handler4)
  return handler1
}

export const makeChangeArticle = (): Handler => {
  const service = makeArticleService()
  const handler1 = makeTokenCertifierHandler()
  const handler2 = makeAuthorizationHandler('ChangeArticle')
  const handler3 = makeAccountToAuthorMapperHandler()
  const handler4 = makeServiceHandler(service.change, service)
  handler1.setNext(handler2)
  handler2.setNext(handler3)
  handler3.setNext(handler4)
  return handler1
}
