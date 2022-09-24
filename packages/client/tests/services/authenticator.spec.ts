import { Authentication, HttpStatusCode, InvalidCredentialsError, UnexpectedError } from '@/client/domain'

import { faker } from '@faker-js/faker'
import { HttpClientSpy } from '@/tests/mocks'

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

  test('Should throw UnauthorizedError when http status code 401', async () => {
    const { sut, httpClient } = makeSut()
    httpClient.response = { statusCode: HttpStatusCode.unauthorized }

    const promise = sut.authenticate(mockParams())

    await expect(promise).rejects.toThrowError(new InvalidCredentialsError())
  })

  test('Should throw UnauthorizedError when http status code not 200', async () => {
    const { sut, httpClient } = makeSut()
    const invalidHttpResponses = [
      HttpStatusCode.serverError,
      HttpStatusCode.forbidden,
      HttpStatusCode.notFound,
      HttpStatusCode.noContent,
      HttpStatusCode.badRequest
    ]
    httpClient.response = { statusCode: faker.helpers.arrayElement(invalidHttpResponses) }

    const promise = sut.authenticate(mockParams())

    await expect(promise).rejects.toThrowError(new UnexpectedError())
  })

  test('Should will return body in case of http status code 200', async () => {
    const { sut, httpClient } = makeSut()

    const response = await sut.authenticate(mockParams())

    expect(response).toStrictEqual(httpClient.response.body)
  })
})
