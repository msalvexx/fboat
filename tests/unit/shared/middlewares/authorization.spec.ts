import { mockAccount } from '@/tests/mocks/iam'
import { UnauthorizedError } from '@/iam'
import { AuthorizationHandler } from '@/shared/middlewares/authorization'

describe('Authorization Handler', () => {
  test('Should throw if request not contains key loggedAccount', async () => {
    const sut = new AuthorizationHandler('ChangeAccount')

    const promise = sut.handle({})

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })

  test('Should throws if request not contains permission', async () => {
    const sut = new AuthorizationHandler('ChangeAccount')

    const promise = sut.handle({ loggedAccount: mockAccount() })

    await expect(promise).rejects.toThrow(new UnauthorizedError())
  })
})
