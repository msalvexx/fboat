import { UnauthorizedError, User } from '@/iam'
import { AccountGuard } from '@/iam/service/guard'
import { mockChangeAccountParams, mockChangePasswordParams, mockCreateAccountParams, mockUser } from '@/tests/mocks'

const makeSut = (user: User = mockUser()): AccountGuard => new AccountGuard(undefined as any, mockUser())

describe('When validating permissions', () => {
  test('Will throw UnauthorizedError if not has permission to create account', async () => {
    const sut = makeSut()
    const params = mockCreateAccountParams('invalid@mail.com')

    const promise = sut.create(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizeError if not has permission to change account', async () => {
    const sut = makeSut()
    const params = mockChangeAccountParams('invalid@mail.com')

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizeError if not has permission to change password', async () => {
    const sut = makeSut()
    const params = mockChangePasswordParams()

    const promise = sut.changePassword(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })
})
