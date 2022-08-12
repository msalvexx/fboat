import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'
import { makeAuthenticationService } from '@/application/factories'

const authService = makeAuthenticationService()

export const auth = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void => {
  const token = request.headers.authorization ?? ''
  authService.certificate(token).then(loggedUser => {
    request.body = { ...request.body as object, loggedUser }
    done()
  }).catch(async err => {
    await reply.code(400)
    done(err)
  })
}
