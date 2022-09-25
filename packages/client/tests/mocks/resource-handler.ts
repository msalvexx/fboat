import { HttpStatusCode, ResourceHandler } from '@/client/domain'

import { faker } from '@faker-js/faker'

export class HttpResourceHandlerSpy implements ResourceHandler {
  response = {
    statusCode: HttpStatusCode.ok,
    body: JSON.parse(faker.datatype.json())
  }

  body: any

  request = async (body: any): Promise<any> => {
    this.body = body
    return this.response
  }
}
