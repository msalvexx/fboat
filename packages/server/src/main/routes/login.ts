import { FastifyInstance, RouteOptions } from 'fastify'

import { loginSchema } from '@/server/shared/infra/schemas/iam'

import { makeLogin } from '@/server/main/factories'
import adapt from '@/server/main/adapters/service-handler'

export const loginRoute = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  router.post('/login', { schema: loginSchema }, adapt(makeLogin()))
}
