import { FastifyInstance, RouteOptions } from 'fastify'

import { makeAuthenticationService } from '@/shared/application/factories/services'
import { fastifyHandlerPostPutAdapter as adapt } from '@/shared/application/adapters'
import { loginSchema } from '@/shared/application/schemas/iam'

export const loginRoute = async (router: FastifyInstance, _: RouteOptions): Promise<void> => {
  const authService = makeAuthenticationService()
  router.post('/login', { schema: loginSchema }, adapt(authService.authenticate.bind(authService)))
}
