import { MySQLArticleRepository } from '@/content-system/infra'
import { ArticleService, AttachmentService } from '@/content-system/services'
import { Handler } from '@/shared/domain/protocols/handler'
import { EnvConfig } from '@/main/configs'
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
    .onSuccess(201)
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

export const makeRemoveArticle = (): Handler => {
  const repository = makeArticleRepository()
  return HandlerBuilder
    .of(repository)
    .tokenCertifier()
    .authorization('DeleteArticle')
    .onSuccess(204)
    .service(repository.remove)
}

const makeAttachmentService = (): AttachmentService => {
  const configs = EnvConfig.getInstance().configs
  const server: string = configs.server.url
  const path: string = configs.staticFile.prefix
  const staticFileDirectory: string = configs.staticFile.root
  const prefixPath = `${server}${path}`
  return new AttachmentService(staticFileDirectory, prefixPath)
}

export const makeSaveAttachment = (): Handler => {
  const service = makeAttachmentService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .fileUpload()
    .onSuccess(201)
    .service(service.save)
}

export const makeRemoveAttachment = (): Handler => {
  const service = makeAttachmentService()
  return HandlerBuilder
    .of(service)
    .tokenCertifier()
    .onSuccess(204)
    .service(service.remove)
}
