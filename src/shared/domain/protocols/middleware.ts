export interface Handler {
  setNext: (handler: Handler) => Handler
  handle: (params: any) => Promise<any>
}
