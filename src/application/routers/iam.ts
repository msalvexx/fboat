import { FastifyInstance, RouteOptions } from 'fastify'

import { makeAccountService } from '@/application/factories/services'
import { auth, fastifyHandlerAdapter as adapt } from '@/application/adapters'
import { changeAccountSchema, changePasswordSchema, createAccountSchema, getAccountSchema } from '@/application/schemas/iam'

const accountService = makeAccountService()

export default async function (router: FastifyInstance, _: RouteOptions): Promise<void> {
  router.post('/account', { preHandler: auth, schema: createAccountSchema }, adapt(accountService.createAccount))
  router.get('/account/:accountId', { preHandler: auth, schema: getAccountSchema }, adapt(accountService.getAccount))
  router.put('/account/:accountId', { preHandler: auth, schema: changeAccountSchema }, adapt(accountService.changeAccount))
  router.put('/account/:accountId/password', { preHandler: auth, schema: changePasswordSchema }, adapt(accountService.changePassword))
}
