import { UnauthorizedError } from '@fboat/core'
import { HttpStatusCode, HttpStatusHandler } from '@/client/domain'

import { HttpResourceHandlerSpy } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: HttpStatusHandler
  handlerSpy: HttpResourceHandlerSpy
}

type SutParams = {
  statusCode: HttpStatusCode
  error: Error
}

const makeSut = ({ statusCode, error }: SutParams = { statusCode: 401, error: new UnauthorizedError() }): SutTypes => {
  const handlerSpy = new HttpResourceHandlerSpy()
  const sut = new HttpStatusHandler(handlerSpy, statusCode, error)
  return { sut, handlerSpy }
}

describe('Http Resource Handler', () => {
  test('Should call decoratee correctly', async () => {
    const { sut, handlerSpy } = makeSut()
    const body = JSON.parse(faker.datatype.json())

    await sut.request(body)

    expect(handlerSpy.body).toStrictEqual(body)
  })

  test('Should should throw error case status code matched class definition', async () => {
    const error = new UnauthorizedError()
    const statusCode = HttpStatusCode.forbidden
    const { sut, handlerSpy } = makeSut({ statusCode, error })
    handlerSpy.response.statusCode = statusCode
    const body = JSON.parse(faker.datatype.json())

    const promise = sut.request(body)

    await expect(promise).rejects.toThrow(error)
  })

  test('Should return decorattee response case status code not matches', async () => {
    const { sut, handlerSpy } = makeSut()
    const body = JSON.parse(faker.datatype.json())

    const response = await sut.request(body)

    expect(response).toStrictEqual(handlerSpy.response)
  })
})
