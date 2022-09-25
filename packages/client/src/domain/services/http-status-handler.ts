import { HttpResponse, HttpStatusCode, ResourceHandler } from '@/client/domain'

type ErrorHandler = (body: any) => Error

export class HttpStatusHandler<T = any> implements ResourceHandler {
  constructor (
    private readonly handler: ResourceHandler<HttpResponse<T>>,
    private readonly statusCode: HttpStatusCode,
    private readonly error: Error | ErrorHandler) {}

  request = async (body: any): Promise<HttpResponse<T>> => {
    const httpResponse = await this.handler.request(body)
    if (httpResponse.statusCode === this.statusCode) {
      const error = this.error instanceof Error ? this.error : this.error(body)
      throw error
    }
    return httpResponse
  }
}
