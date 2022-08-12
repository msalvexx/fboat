import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticationService } from '@/application/factories'

const authService = makeAuthenticationService()

export const auth = async (request: FastifyRequest, reply: FastifyReply): Promise<any> => {
  const token = request.headers.authorization ?? ''
  try {
    const loggedUser = await authService.certificate(token)
    request.body = { ...request.body as object, loggedUser }
  } catch {
    await reply.code(403)
  }
}
