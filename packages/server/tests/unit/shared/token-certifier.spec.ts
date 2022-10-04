import { UnauthorizedError } from '@fboat/core/iam/models'
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

  test('Should call super handle without any account when provided invalid token', async () => {
    service.result = false

    await sut.handle({})

    expect(spy.params).toStrictEqual({ })
  })

  test('Should add logged account on parameters on success authentication', async () => {
    await sut.handle({})

    expect(spy.params).toStrictEqual({ loggedAccount: mockAccount() })
  })
})
