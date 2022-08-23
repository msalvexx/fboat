import { FastifyInstance, RouteOptions } from 'fastify'

import { makeAccountService } from '@/main/factories/iam/services'
import { auth, fastifyHandlerPostPutAdapter as postPutAdapt, fastifyHandlerGetDeleteAdapter as getDeleteAdapt } from '@/main/adapters'
import { changeAccountSchema, changePasswordSchema, createAccountSchema, getAccountSchema } from '@/shared/schemas/iam'

export const iamRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  const accountService = makeAccountService()
  router.post('/account', { preHandler: auth, schema: createAccountSchema }, postPutAdapt(accountService.createAccount.bind(accountService)))
  router.get('/account/:id', { preHandler: auth, schema: getAccountSchema }, getDeleteAdapt(accountService.getAccount.bind(accountService)))
  router.put('/account/:id', { preHandler: auth, schema: changeAccountSchema }, postPutAdapt(accountService.changeAccount.bind(accountService)))
  router.put('/account/:id/password', { preHandler: auth, schema: changePasswordSchema }, postPutAdapt(accountService.changePassword.bind(accountService)))
}
