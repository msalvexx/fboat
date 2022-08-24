import { FastifyInstance, RouteOptions } from 'fastify'

import { getArticleSchema, createArticleSchema, changeArticleSchema, listArticleSchema } from '@/shared/infra/gateways/schemas/content-system'

import { makeChangeArticle, makeCreateArticle, makeGetArticle, makeListArticles } from '@/main/factories'
import adapt from '@/main/adapters/service-handler'

export const contentSystemRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  router.post('/article', { schema: createArticleSchema }, adapt(makeCreateArticle()))
  router.put('/article/:idOrSlug', { schema: changeArticleSchema }, adapt(makeChangeArticle()))
  router.get('/article/:idOrSlug', { schema: getArticleSchema }, adapt(makeGetArticle()))
  router.get('/article', { schema: listArticleSchema }, adapt(makeListArticles()))
}
