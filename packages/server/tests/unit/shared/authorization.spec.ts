import { ForbiddenError, UnauthorizedError } from '@fboat/core/iam/models'
import { AuthorizationController } from '@/server/shared/controllers/authorization'

import { ControllerSpy } from '@/tests/mocks/shared'
import { mockAccount } from '@/tests/mocks/iam'

describe('Authorization Controller', () => {
  let sut: AuthorizationController
  let spy: ControllerSpy

  beforeEach(() => {
    sut = new AuthorizationController('ChangeAccount')
    spy = new ControllerSpy()
    sut.setNext(spy)
  })

  test('Should throw if request not contains key loggedAccount', async () => {
    const promise = sut.handle({})

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  test('Should throws if request not contains permission', async () => {
    const promise = sut.handle({ loggedAccount: mockAccount() })

    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should call super handler', async () => {
    const params = { loggedAccount: mockAccount({ user: { roles: ['Administrator'] } }) }

    await sut.handle(params)

    expect(spy.params).toStrictEqual(params)
  })
})
