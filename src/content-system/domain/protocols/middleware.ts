export type ServiceHandler = (params: any) => Promise<any>
export type Middleware = (handler: ServiceHandler) => ServiceHandler
