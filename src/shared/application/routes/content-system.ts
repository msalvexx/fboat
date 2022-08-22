import { FastifyInstance, RouteOptions } from 'fastify'

import { getArticleSchema } from '@/shared/application/schemas/content-system'
import { makeArticleService } from '@/shared/application/factories/content-system'
import { auth, fastifyHandlerGetDeleteAdapter as getDeleteAdapt } from '@/shared/application/adapters'

export const contentSystemRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  const articleService = makeArticleService()
  router.get('/article/:id', { preHandler: auth, schema: getArticleSchema }, getDeleteAdapt(articleService.get.bind(articleService)))
}
