import { HttpMethod, HttpRequest, UnexpectedError } from '@/client/domain'

import { HttpClientSpy } from '@/tests/mocks'
import { faker } from '@faker-js/faker'
import { HttpResourceHandler } from '@/client/domain/services'

type SutTypes = {
  sut: HttpResourceHandler
  httpClient: HttpClientSpy
  httpRequest: HttpRequest
}

const makeSut = (): SutTypes => {
  const httpClient = new HttpClientSpy()
  const httpRequest = {
    url: faker.internet.url(),
    headers: JSON.parse(faker.datatype.json()),
    method: faker.helpers.arrayElement<HttpMethod>(['delete', 'get', 'post', 'put'])
  }
  const sut = new HttpResourceHandler(httpClient, httpRequest)
  return { sut, httpClient, httpRequest }
}

describe('Http Resource Handler', () => {
  test('Should call request correctly', async () => {
    const { sut, httpClient, httpRequest } = makeSut()
    const { url, method, headers } = httpRequest
    const body = JSON.parse(faker.datatype.json())

    await sut.request(body)

    expect(httpClient.url).toBe(url)
    expect(httpClient.method).toBe(method)
    expect(httpClient.headers).toStrictEqual(headers)
    expect(httpClient.body).toStrictEqual(body)
  })

  test('Should throw UnexpectedError in case of error thrown', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = new Error()
    const body = JSON.parse(faker.datatype.json())

    const promise = sut.request(body)

    await expect(promise).rejects.toThrow(UnexpectedError)
  })

  test('Should return body and status code on success', async () => {
    const { sut, httpClient } = makeSut()
    const body = JSON.parse(faker.datatype.json())

    const response = await sut.request(body)

    expect(response).toStrictEqual(httpClient.response)
  })
})
