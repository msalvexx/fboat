import { MySQLArticleRepository } from '@/server/content-system/infra'
import { ArticleService, AttachmentService } from '@/server/content-system/services'
import { Controller } from '@/server/shared/protocols/controller'
import { EnvConfig } from '@/server/main/configs'
import { ControllerBuilder } from './controller-builder'

const makeArticleRepository = (): MySQLArticleRepository => new MySQLArticleRepository()
const makeArticleService = (): ArticleService => new ArticleService(makeArticleRepository())

export const makeGetArticle = (): Controller => {
  const service = makeArticleService()
  return ControllerBuilder
    .of(service)
    .hideUnpublishedArticle()
    .service(service.get)
}

export const makeCreateArticle = (): Controller => {
  const service = makeArticleService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('CreateArticle')
    .accountToAuthor()
    .onSuccess(201)
    .service(service.create)
}

export const makeChangeArticle = (): Controller => {
  const service = makeArticleService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .authorization('ChangeArticle')
    .accountToAuthor()
    .service(service.change)
}

export const makeListArticles = (): Controller => {
  const repository = makeArticleRepository()
  return ControllerBuilder
    .of(repository)
    .service(repository.fetchPage)
}

export const makeRemoveArticle = (): Controller => {
  const repository = makeArticleRepository()
  return ControllerBuilder
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

export const makeSaveAttachment = (): Controller => {
  const service = makeAttachmentService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .fileUpload()
    .onSuccess(201)
    .service(service.save)
}

export const makeRemoveAttachment = (): Controller => {
  const service = makeAttachmentService()
  return ControllerBuilder
    .of(service)
    .tokenCertifier()
    .onSuccess(204)
    .service(service.remove)
}
