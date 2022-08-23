import { FastifyInstance, RouteOptions } from 'fastify'

import { makeAuthenticationService } from '@/main/factories/iam/services'
import { fastifyHandlerPostPutAdapter as adapt } from '@/main/adapters'
import { loginSchema } from '@/shared/infra/gateways/schemas/iam'

export const loginRoute = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  const authService = makeAuthenticationService()
  router.post('/login', { schema: loginSchema }, adapt(authService.authenticate.bind(authService)))
}
