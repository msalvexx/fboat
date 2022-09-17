import { Controller as ServiceHandler } from '@/server/shared/protocols/controller'

import { FastifyRequest, FastifyReply } from 'fastify'

type FastifyRequestHandler = (request: FastifyRequest, reply: FastifyReply) => Promise<any>
type AdapterContract = (service: ServiceHandler) => FastifyRequestHandler
const fastifyAdapter: AdapterContract = service => async (request, reply) => {
  const { statusCode, body } = await service.handle(request.body)
  return await reply.code(statusCode).send(body ?? '')
}

export default fastifyAdapter
