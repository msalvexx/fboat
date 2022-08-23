import { FastifyInstance, RouteOptions } from 'fastify'

import { changeAccountSchema, changePasswordSchema, createAccountSchema, getAccountSchema } from '@/shared/infra/gateways/schemas/iam'
import { makeChangeAccount, makeChangePassword, makeCreateAccount, makeGetAccount } from '@/main/factories'
import { fastifyHandlerPostPutAdapter as adapt } from '@/main/adapters'

export const iamRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  router.post('/account', { schema: createAccountSchema }, adapt(makeCreateAccount()))
  router.get('/account/:accountId', { schema: getAccountSchema }, adapt(makeGetAccount()))
  router.put('/account/:accountId', { schema: changeAccountSchema }, adapt(makeChangeAccount()))
  router.put('/account/:accountId/password', { schema: changePasswordSchema }, adapt(makeChangePassword()))
}
