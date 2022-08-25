import { FastifyInstance, RouteOptions } from 'fastify'

import * as Schema from '@/shared/infra/gateways/schemas/iam'

import * as Factory from '@/main/factories'
import adapt from '@/main/adapters/service-handler'

export const iamRoutes = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  router.post('/account', { schema: Schema.createAccountSchema }, adapt(Factory.makeCreateAccount()))
  router.get('/account/:accountId', { schema: Schema.getAccountSchema }, adapt(Factory.makeGetAccount()))
  router.put('/account/:accountId', { schema: Schema.changeAccountSchema }, adapt(Factory.makeChangeAccount()))
  router.put('/account/:accountId/password', { schema: Schema.changePasswordSchema }, adapt(Factory.makeChangePassword()))
}
