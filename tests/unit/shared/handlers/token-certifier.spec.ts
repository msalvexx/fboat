import { UnauthorizedError } from '@/iam/domain/model'
import { TokenCertifierHandler } from '@/shared/handlers/token-certifier'

import { AuthenticationCertifierMock, mockAccount } from '@/tests/mocks/iam'
import { HandlerSpy } from '@/tests/mocks/shared'

describe('Authentication Handler', () => {
  let sut: TokenCertifierHandler
  let service: AuthenticationCertifierMock
  let spy: HandlerSpy

  beforeEach(() => {
    service = new AuthenticationCertifierMock()
    sut = new TokenCertifierHandler(service)
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
