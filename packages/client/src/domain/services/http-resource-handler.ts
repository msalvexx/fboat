import { HttpClient, HttpRequest, HttpResponse, ResourceHandler } from '@/client/domain/protocols'
import { UnexpectedError } from '@/client/domain/models'

export class HttpResourceHandler<T = any> implements ResourceHandler {
  constructor (
    private readonly httpClient: HttpClient,
    private readonly httpRequest: HttpRequest) {}

  request = async (body: any): Promise<HttpResponse<T>> => {
    try {
      return await this.httpClient.request({ ...this.httpRequest, body })
    } catch {
      throw new UnexpectedError()
    }
  }
}
