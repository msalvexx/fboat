import { UnauthorizedError, User } from '@/iam'
import { AccountGuard } from '@/iam/service/guard'
import { mockChangeAccountParams, mockChangePasswordParams, mockCreateAccountParams, mockUser } from '@/tests/mocks/iam'

const makeSut = (user: User = mockUser()): AccountGuard => new AccountGuard(undefined as any, mockUser())

describe('When validating permissions', () => {
  test('Will throw UnauthorizedError if not has permission to create account', async () => {
    const sut = makeSut()
    const params = mockCreateAccountParams('invalid@mail.com')

    const promise = sut.createAccount(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizedError if not has permission to change account', async () => {
    const sut = makeSut()
    const params = mockChangeAccountParams('invalid@mail.com')

    const promise = sut.changeAccount(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizedError if not has permission to change password', async () => {
    const sut = makeSut()
    const params = mockChangePasswordParams()

    const promise = sut.changePassword(params)

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })

  test('Will throw UnauthorizedError if not has permission to get account', async () => {
    const sut = makeSut()

    const promise = sut.getAccount('invalid@mail.com')

    await expect(promise).rejects.toThrowError(new UnauthorizedError())
  })
})
