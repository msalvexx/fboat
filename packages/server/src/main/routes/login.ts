import { FastifyInstance, RouteOptions } from 'fastify'

import { loginSchema } from '@fboat/core/iam/schemas'

import { makeLogin } from '@/server/main/factories'
import adapt from '@/server/main/adapters/service-handler'

export const loginRoute = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  router.post('/login', { schema: loginSchema }, adapt(makeLogin()))
}
