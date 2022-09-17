import { UnauthorizedError } from '@/core/iam'
import { TokenCertifierController } from '@/server/shared/controllers/token-certifier'

import { AuthenticationCertifierMock, mockAccount } from '@/tests/mocks/iam'
import { ControllerSpy } from '@/tests/mocks/shared'

describe('Authentication Controller', () => {
  let sut: TokenCertifierController
  let service: AuthenticationCertifierMock
  let spy: ControllerSpy

  beforeEach(() => {
    service = new AuthenticationCertifierMock()
    sut = new TokenCertifierController(service)
    spy = new ControllerSpy()
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
