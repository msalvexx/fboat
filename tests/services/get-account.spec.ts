import { AccountNotFoundError } from "@/iam"
import { mockAccount } from "../mocks"
import { AccountServiceSut } from "./factory"

describe('Get Account', () => {
  test('Should throw AccountNotFoundError if repository returns undefined', async () => {
    const { sut } = AccountServiceSut.makeSut()
    const email = 'invalid@mail.com'

    const promise = sut.getAccount(email)

    await expect(promise).rejects.toThrowError(new AccountNotFoundError(email))
  })

  test('Should return an account correctly if account exists', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const account = mockAccount()
    repo.readResult = account
    const email = 'valid@mail.com'

    const result = await sut.getAccount(email)

    expect(result).toStrictEqual(account)
  })
})
