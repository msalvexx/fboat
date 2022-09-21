import { AuthenticateUser } from '@fboat/core/iam/protocols'

import { faker } from '@faker-js/faker'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export enum HttpStatusCode {
  ok = 200,
  unauthorized = 401,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body?: T
}

class HttpClientSpy implements HttpClient {
  url!: string
  body!: any
  method!: HttpMethod
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok
  }

  async request (data: HttpRequest): Promise<HttpResponse<any>> {
    this.body = data.body
    this.method = data.method
    this.url = data.url
    return this.response
  }
}

class Authentication implements AuthenticateUser {
  constructor (
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async authenticate (params: AuthenticateUser.Params): Promise<AuthenticateUser.Result> {
    const httpResponse = await this.httpClient.request({
      method: 'post',
      url: this.url,
      body: params
    })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
    }
    return null as any
  }
}

export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credenciais inválidas')
    this.name = 'InvalidCredentialsError'
  }
}

type SutTypes = {
  httpClient: HttpClientSpy
  url: string
  sut: Authentication
}

const makeSut = (): SutTypes => {
  const url = faker.internet.url()
  const httpClient = new HttpClientSpy()
  const sut = new Authentication(url, httpClient)
  return { sut, httpClient, url }
}

const mockParams = (): any => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('Authenticate User', () => {
  test('Should call http client with correct values', async () => {
    const { sut, httpClient, url } = makeSut()
    const params = mockParams()

    await sut.authenticate(params)

    expect(httpClient.body).toStrictEqual(params)
    expect(httpClient.method).toBe('post')
    expect(httpClient.url).toBe(url)
  })

  test('Should throw UnauthorizedError when status code 401', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = { statusCode: HttpStatusCode.unauthorized }

    const promise = sut.authenticate(mockParams())

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError())
  })
})
