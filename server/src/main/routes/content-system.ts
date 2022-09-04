import * as Schema from '@/shared/infra/gateways/schemas/content-system'
import * as Factory from '@/main/factories'
import adapt from '@/main/adapters/service-handler'

import { FastifyInstance, RouteOptions } from 'fastify'

export const contentSystemRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  router.delete('/article/:idOrSlug', { schema: Schema.deleteArticleSchema }, adapt(Factory.makeRemoveArticle()))
  router.put('/article/:idOrSlug', { schema: Schema.changeArticleSchema }, adapt(Factory.makeChangeArticle()))
  router.get('/article/:idOrSlug', { schema: Schema.getArticleSchema }, adapt(Factory.makeGetArticle()))
  router.get('/article', { schema: Schema.listArticleSchema }, adapt(Factory.makeListArticles()))
  router.post('/article', { schema: Schema.createArticleSchema }, adapt(Factory.makeCreateArticle()))

  router.post('/attachment', { schema: Schema.saveAttachmentSchema }, adapt(Factory.makeSaveAttachment()))
  router.delete('/attachment/:fileName', { schema: Schema.removeAttachmentSchema }, adapt(Factory.makeRemoveAttachment()))
}
