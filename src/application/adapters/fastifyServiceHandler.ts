type Controller = (params: any) => any
type RequestHandler = (request: any, response: any) => Promise<void>
type Contract = (controler: Controller) => RequestHandler

export const fastifyHandler: Contract = controller => async (request: any, response: any) => {
  const result = await controller(request.body)
  response.send(result)
}
