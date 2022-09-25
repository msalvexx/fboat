import { Handler, HttpRequest, HttpResourceHandler, HttpResponseHandler, HttpResponseMapper, HttpStatusCode, HttpStatusHandler, ResourceHandler } from '@/client/domain'
import { makeAxiosHttpClient } from '@/client/main/factories'
import { ForbiddenError, ResourceNotFoundError, UnauthorizedError } from '@fboat/core'

export class HttpResourceHandlerBuilder<T = any> {
  private constructor (private instance: ResourceHandler) {}

  public static resource<T> (request: HttpRequest): HttpResourceHandlerBuilder<T> {
    return new HttpResourceHandlerBuilder<T>(new HttpResourceHandler(makeAxiosHttpClient<T>(), request))
  }

  unauthorized (): HttpResourceHandlerBuilder<T> {
    this.instance = new HttpStatusHandler(this.instance, HttpStatusCode.unauthorized, new UnauthorizedError())
    return this
  }

  forbidden (): HttpResourceHandlerBuilder<T> {
    this.instance = new HttpStatusHandler(this.instance, HttpStatusCode.forbidden, new ForbiddenError())
    return this
  }

  notFound (): HttpResourceHandlerBuilder<T> {
    this.instance = new HttpStatusHandler(this.instance, HttpStatusCode.notFound, new ResourceNotFoundError())
    return this
  }

  map<R = any> (mapper: HttpResponseMapper<T, R> = undefined): HttpResourceHandlerBuilder<T> {
    this.instance = new HttpResponseHandler(this.instance, mapper)
    return this
  }

  build<R = any> (): Handler<R> {
    return this.instance.request.bind(this.instance)
  }
}
