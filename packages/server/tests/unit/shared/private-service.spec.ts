import { UnauthorizedError } from '@fboat/core/iam/models'
import { PrivateServiceController } from '@/server/shared/controllers/private-service'

import { AuthenticationCertifierMock, mockAccount } from '@/tests/mocks/iam'
import { ControllerSpy } from '@/tests/mocks/shared'

describe('Private Service Controller', () => {
  let sut: PrivateServiceController
  let service: AuthenticationCertifierMock
  let spy: ControllerSpy

  beforeEach(() => {
    service = new AuthenticationCertifierMock()
    sut = new PrivateServiceController()
    spy = new ControllerSpy()
    sut.setNext(spy)
  })

  test('Should throw UnauthorizedError if service has no logged account', async () => {
    service.result = false

    const promise = sut.handle({})

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  test('Should call super handler if contains a logged account', async () => {
    const params = { loggedAccount: mockAccount() }

    await sut.handle(params)

    expect(spy.params).toStrictEqual(params)
  })
})
