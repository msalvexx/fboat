import { AccountToAuthorMapperController } from '@/server/shared/controllers/acount-author-mapper'

import { mockAccount } from '@/tests/mocks/iam'
import { ControllerSpy } from '@/tests/mocks/shared'

describe('Account to Author Mapper Controller', () => {
  let sut: AccountToAuthorMapperController
  let spy: ControllerSpy

  beforeEach(() => {
    sut = new AccountToAuthorMapperController()
    spy = new ControllerSpy()
    sut.setNext(spy)
  })

  test('Should call super handler change loggedAccount to author param', async () => {
    const loggedAccount = mockAccount({ user: { roles: ['Administrator'] } })
    const params = { loggedAccount }

    await sut.handle(params)

    expect(spy.params).toStrictEqual({
      ...params,
      author: {
        accountId: loggedAccount.accountId,
        name: loggedAccount.personalData.fullName,
        occupation: loggedAccount.personalData.occupation,
        photo: loggedAccount.personalData.photo
      }
    })
  })

  test('Should prefer use authorId instead of loggedAccount', async () => {
    const loggedAccount = mockAccount({ user: { roles: ['Administrator'] } })
    const authorOverrided = {
      accountId: 'any id',
      name: 'any name',
      occupation: 'any occupation',
      photo: 'any photo'
    }
    const params = {
      loggedAccount,
      author: authorOverrided
    }
    await sut.handle(params)

    expect(spy.params).toStrictEqual({
      ...params,
      author: authorOverrided
    })
  })

  test('Should call super handler without author if no loggedAccount is provided', async () => {
    const params = { any: 'result' }

    await sut.handle(params)

    expect(spy.params).not.toMatchObject({ author: expect.anything() })
  })
})
