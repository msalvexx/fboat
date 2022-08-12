import { FastifyInstance, RouteOptions } from 'fastify'

import { makeAuthenticationService } from '@/application/factories/services'
import { fastifyHandlerAdapter as adapt } from '@/application/adapters'
import { loginSchema } from '@/application/schemas/iam'

const authService = makeAuthenticationService()

export default async function (router: FastifyInstance, _: RouteOptions): Promise<void> {
  router.post('/login', { schema: loginSchema }, adapt(authService.authenticate))
}
