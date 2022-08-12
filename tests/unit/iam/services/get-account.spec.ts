import { AccountNotFoundError } from "@/iam"

import { mockAccount } from "@/tests/mocks/iam"
import { AccountServiceSut } from "./factory"

describe('Get Account', () => {
  test('Should throw AccountNotFoundError if repository returns undefined', async () => {
    const { sut } = AccountServiceSut.makeSut()
    const accountId = 'invalidAccountId'

    const promise = sut.getAccount(accountId)

    await expect(promise).rejects.toThrowError(new AccountNotFoundError(accountId))
  })

  test('Should return an account correctly if account exists', async () => {
    const { sut, repo } = AccountServiceSut.makeSut()
    const account = mockAccount({ accountId: 'validAccountId' })
    repo.readByAccountIdResult = account

    const result = await sut.getAccount(account.accountId)

    expect(result).toStrictEqual(account)
  })
})
