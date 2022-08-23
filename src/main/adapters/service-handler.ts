import { FastifyReply, FastifyRequest } from 'fastify'
import { Handler } from '@/shared/protocols/middleware'

type RequestHandler = (request: FastifyRequest, response: FastifyReply) => Promise<any>
type Contract = (service: Handler) => RequestHandler

export const fastifyHandlerPostPutAdapter: Contract = service => async (request: FastifyRequest, _: FastifyReply) => await service.handle(request.body)
