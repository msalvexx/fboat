import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticationService } from '@/application/factories'

export const auth = async (request: FastifyRequest, _: FastifyReply): Promise<void> => {
  const authService = makeAuthenticationService()
  const token = request.headers.authorization ?? ''
  const loggedAccount = await authService.certificate(token)
  request.body = { ...request.body as object, loggedAccount }
}
