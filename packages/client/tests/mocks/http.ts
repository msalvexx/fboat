import { HttpClient, HttpMethod, HttpResponse, HttpStatusCode, HttpRequest } from '@/client/domain/protocols'

import { faker } from '@faker-js/faker'

export class HttpClientSpy implements HttpClient {
  url!: string
  body!: any
  method!: HttpMethod
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
    body: {
      token: faker.datatype.uuid()
    }
  }

  async request (data: HttpRequest): Promise<HttpResponse<any>> {
    this.body = data.body
    this.method = data.method
    this.url = data.url
    return this.response
  }
}