import { HttpResponse, ResourceHandler } from '@/client/domain/protocols'

export type HttpResponseMapper<T, R> = (result: T) => R

export class HttpResponseHandler<T = any, R = T> implements ResourceHandler {
  constructor (
    private readonly handler: ResourceHandler<HttpResponse<T>>,
    private readonly mapper: HttpResponseMapper<T, R>
  ) {}

  request = async (body: any): Promise<T | R> => {
    const httpResponse = await this.handler.request(body)
    return this.mapper === undefined ? httpResponse.body : this.mapper(httpResponse.body)
  }
}
