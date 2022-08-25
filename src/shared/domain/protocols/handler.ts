export namespace Handler {
  export type Params = any
  export type Result = Promise<{ body: any, statusCode: number }>
}

export interface Handler {
  setNext: (handler: Handler) => Handler
  handle: (params: Handler.Params) => Promise<Handler.Result>
}
