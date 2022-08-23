import { AuthenticationCertifierMock, mockAccount } from '@/tests/mocks/iam'
import { HandlerSpy } from '@/tests/mocks/shared/middlewares'
import { UnauthorizedError } from '@/iam'
import { AuthenticationHandler } from '@/shared/middlewares/authentication'

describe('Authentication Handler', () => {
  let sut: AuthenticationHandler
  let service: AuthenticationCertifierMock
  let spy: HandlerSpy

  beforeEach(() => {
    service = new AuthenticationCertifierMock()
    sut = new AuthenticationHandler(service)
    spy = new HandlerSpy()
    sut.setNext(spy)
  })

  test('Should throw UnauthorizedError if service throws', async () => {
    service.result = false

    const promise = sut.handle({})

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  test('Should add logged account on parameters on success authentication', async () => {
    await sut.handle({})

    expect(spy.params).toStrictEqual({ loggedAccount: mockAccount() })
  })
})
