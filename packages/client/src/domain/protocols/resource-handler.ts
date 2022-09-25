export type Handler<R> = (body: any) => Promise<R>

export interface ResourceHandler<T = any> {
  request: (body: any) => Promise<T>
}
