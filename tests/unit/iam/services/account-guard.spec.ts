import { UnauthorizedError } from '@/iam'
import { AccountGuard } from '@/iam/service/guard'
import { mockAccount, mockChangeAccountParams, mockChangePasswordParams, mockCreateAccountParams } from '@/tests/mocks/iam'

const makeSut = (): AccountGuard => new AccountGuard(undefined as any, mockAccount())

describe('When validating permissions', () => {
  test('Will throw UnauthorizedError if not has permission to create account', async () => {
    const sut = makeSut()
    const params = mockCreateAccountParams('invalid@mail.com')

    const promise = sut.createAccount(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizedError if not has permission to change account', async () => {
    const sut = makeSut()
    const params = mockChangeAccountParams('invalid-id')

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizedError if not has permission to change password', async () => {
    const sut = makeSut()
    const params = mockChangePasswordParams()

    const promise = sut.changePassword(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })
})
