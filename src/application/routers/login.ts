import { makeAuthenticationService } from '@/application/factories/services'
import { loginSchema } from '@/application/schemas/iam'
import { fastifyHandler } from '@/application/adapters'

import { FastifyInstance, RouteOptions } from 'fastify'

const authService = makeAuthenticationService()

export default async function (router: FastifyInstance, _: RouteOptions): Promise<void> {
  router.post('/login', { schema: loginSchema }, fastifyHandler(authService.authenticate))
}
