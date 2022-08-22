import { FastifyInstance, RouteOptions } from 'fastify'

import { getArticleSchema, createArticleSchema } from '@/shared/application/schemas/content-system'
import { makeArticleService } from '@/shared/application/factories/content-system'
import { auth, fastifyHandlerGetDeleteAdapter as getDeleteAdapt, fastifyHandlerPostPutAdapter as postPutAdapt } from '@/shared/application/adapters'
import { accountToAuthorHandler } from '@/content-system/services'

export const contentSystemRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  const articleService = makeArticleService()
  const createHandler = accountToAuthorHandler(articleService.create.bind(articleService))
  router.get('/article/:id', { preHandler: auth, schema: getArticleSchema }, getDeleteAdapt(articleService.get.bind(articleService)))
  router.post('/article', { preHandler: auth, schema: createArticleSchema }, postPutAdapt(createHandler))
}
