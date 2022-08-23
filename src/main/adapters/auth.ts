import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'
import { makeAuthenticationService } from '@/main/factories'

export const auth = (request: FastifyRequest, _: FastifyReply, done: HookHandlerDoneFunction): void => {
  const authService = makeAuthenticationService()
  const token = request.headers.authorization ?? ''
  authService.certificate(token)
    .then(loggedAccount => {
      request.body = { ...request.body as object, loggedAccount }
      done()
    })
    .catch(err => done(err))
}
