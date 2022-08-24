import { ForbiddenError, UnauthorizedError } from '@/iam/domain/model'
import { AuthorizationHandler } from '@/shared/handlers/authorization'

import { HandlerSpy } from '@/tests/mocks/shared'
import { mockAccount } from '@/tests/mocks/iam'

describe('Authorization Handler', () => {
  let sut: AuthorizationHandler
  let spy: HandlerSpy

  beforeEach(() => {
    sut = new AuthorizationHandler('ChangeAccount')
    spy = new HandlerSpy()
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