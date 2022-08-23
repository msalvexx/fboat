import { FastifyInstance, RouteOptions } from 'fastify'

import { accountToAuthorHandler, authorIdHandler } from '@/content-system/services'
import { getArticleSchema, createArticleSchema, changeArticleSchema } from '@/shared/schemas/content-system'
import { makeArticleService } from '@/main/factories/content-system'
import { auth, fastifyHandlerGetDeleteAdapter as getDeleteAdapt, fastifyHandlerPostPutAdapter as postPutAdapt } from '@/main/adapters'

export const contentSystemRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  const articleService = makeArticleService()
  const getHandler = articleService.get.bind(articleService)
  let createHandler = articleService.create.bind(articleService)
  let changeHandler = articleService.change.bind(articleService)
  createHandler = accountToAuthorHandler(createHandler)
  changeHandler = accountToAuthorHandler(changeHandler)
  changeHandler = authorIdHandler(changeHandler)

  router.post('/article', { preHandler: auth, schema: createArticleSchema }, postPutAdapt(createHandler))
  router.put('/article/:id', { preHandler: auth, schema: changeArticleSchema }, postPutAdapt(changeHandler))
  router.get('/article/:id', { preHandler: auth, schema: getArticleSchema }, getDeleteAdapt(getHandler))
}
