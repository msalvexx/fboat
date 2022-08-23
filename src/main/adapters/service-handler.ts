import { FastifyReply, FastifyRequest } from 'fastify'

type ServiceHandler = (params: any) => Promise<any>
type RequestHandler = (request: FastifyRequest, response: FastifyReply) => Promise<any>
type Contract = (handler: ServiceHandler) => RequestHandler

export const fastifyHandlerPostPutAdapter: Contract = handler => async (request: FastifyRequest, _: FastifyReply) => await handler(request.body)
export const fastifyHandlerGetDeleteAdapter: Contract = handler => async (request: FastifyRequest, _: FastifyReply) => {
  const params = request.params as any
  return await handler(params.id)
}
