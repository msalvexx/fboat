export namespace Controller {
  export type Params = any
  export type Result = Promise<{ body: any, statusCode: number }>
}

export interface Controller {
  setNext: (handler: Controller) => Controller
  handle: (params: Controller.Params) => Promise<Controller.Result>
}
