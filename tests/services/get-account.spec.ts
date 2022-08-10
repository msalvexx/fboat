import { AccountNotFoundError } from "@/iam"
import { AccountServiceSut } from "./factory"

describe('Get Account', () => {
  test('Should throw AccountNotFoundError if repository returns undefined', async () => {
    const { sut } = AccountServiceSut.makeSut()
    const email = 'invalid@mail.com'

    const promise = sut.getAccount(email)

    await expect(promise).rejects.toThrowError(new AccountNotFoundError(email))
  })
})
