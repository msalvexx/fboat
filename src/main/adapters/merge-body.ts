import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify'

export const mergeBody = (request: FastifyRequest, _: FastifyReply, done: HookHandlerDoneFunction): void => {
  request.body = {
    ...request.body as any,
    ...request.headers,
    ...request.params as any
  }
  done()
}
