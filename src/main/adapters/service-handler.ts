import { Handler as ServiceHandler } from '@/shared/domain/protocols/middleware'

import { FastifyRequest } from 'fastify'

type FastifyRequestHandler = (request: FastifyRequest) => Promise<any>
type AdapterContract = (service: ServiceHandler) => FastifyRequestHandler
const fastifyAdapter: AdapterContract = service => async request => await service.handle(request.body)

export default fastifyAdapter
