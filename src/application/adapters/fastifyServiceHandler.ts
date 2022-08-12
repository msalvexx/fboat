type ServiceHandler = (params: any) => Promise<any>
type RequestHandler = (request: any, response: any) => Promise<any>
type Contract = (handler: ServiceHandler) => RequestHandler

export const fastifyHandlerAdapter: Contract = handler => async (request: any, _: any) => await handler(request.body)
