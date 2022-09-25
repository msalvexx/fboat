import { Handler, HttpRequest, HttpResourceHandler, HttpResponseHandler, HttpResponseMapper, HttpStatusCode, HttpStatusHandler, ResourceHandler } from '@/client/domain'
import { makeAxiosHttpClient } from '@/client/main/factories'
import { currentAccountState } from '@/client/presentation/components'
import { ForbiddenError, ResourceNotFoundError, UnauthorizedError } from '@fboat/core'
import { useRecoilValue } from 'recoil'

export class HttpResourceHandlerBuilder<T = any> {
  private constructor (private instance: ResourceHandler) {}

  public static resource<T> (request: HttpRequest): HttpResourceHandlerBuilder {
    const { getCurrentAccountCredentials } = useRecoilValue(currentAccountState)
    const credentials = getCurrentAccountCredentials()
    if (credentials) {
      request.headers = request.headers ?? {}
      request.headers = { ...request.headers, Authorization: credentials.token }
    }
    return new HttpResourceHandlerBuilder<T>(new HttpResourceHandler(makeAxiosHttpClient<T>(), request))
  }

  unauthorized (): HttpResourceHandlerBuilder {
    this.instance = new HttpStatusHandler(this.instance, HttpStatusCode.unauthorized, new UnauthorizedError())
    return this
  }

  forbidden (): HttpResourceHandlerBuilder {
    this.instance = new HttpStatusHandler(this.instance, HttpStatusCode.forbidden, new ForbiddenError())
    return this
  }

  notFound (): HttpResourceHandlerBuilder {
    this.instance = new HttpStatusHandler(this.instance, HttpStatusCode.notFound, new ResourceNotFoundError())
    return this
  }

  getHandler<R = any> (mapper: HttpResponseMapper<T, R> = undefined): Handler<R> {
    this.instance = new HttpResponseHandler(this.instance, mapper)
    return this.instance.request.bind(this.instance)
  }
}
