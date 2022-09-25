import { HttpResponseHandler, HttpResponseMapper } from '@/client/domain'

import { HttpResourceHandlerSpy } from '@/tests/mocks'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: HttpResponseHandler
  handlerSpy: HttpResourceHandlerSpy
}

type SutParams = {
  mapper: HttpResponseMapper<any, any>
}

const makeSut = ({ mapper }: SutParams = { mapper: x => x }): SutTypes => {
  const handlerSpy = new HttpResourceHandlerSpy()
  const sut = new HttpResponseHandler(handlerSpy, mapper)
  return { sut, handlerSpy }
}

describe('Http Resource Handler', () => {
  test('Should call decoratee correctly', async () => {
    const { sut, handlerSpy } = makeSut()
    const body = JSON.parse(faker.datatype.json())

    await sut.request(body)

    expect(body).toStrictEqual(handlerSpy.body)
  })

  test('Should return result successfully', async () => {
    const { sut, handlerSpy } = makeSut()
    const body = JSON.parse(faker.datatype.json())

    const response = await sut.request(body)

    expect(response).toStrictEqual(handlerSpy.response.body)
  })

  test('Should map result successfully', async () => {
    const { sut, handlerSpy } = makeSut({ mapper: x => ({ result: x }) })
    const body = JSON.parse(faker.datatype.json())

    const response = await sut.request(body)

    expect(response).toStrictEqual({
      result: handlerSpy.response.body
    })
  })
})
