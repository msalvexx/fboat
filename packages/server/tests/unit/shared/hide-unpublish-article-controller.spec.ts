import { AbstractController } from '@/server/shared/controllers'

import { ControllerSpy } from '@/tests/mocks/shared'
import { mockArticle } from '@/tests/mocks/content-system'
import { mockAccount } from '@/tests/mocks/iam'
import { Account, GetArticle, ResourceNotFoundError } from '@fboat/core'

export class HideUnpublishedArticleController extends AbstractController {
  override async handle (params: any): Promise<any> {
    const result = await super.handle(params)
    const article = result.body as GetArticle.Result
    if (!article.isPublished) {
      const isLogged = 'loggedAccount' in params
      const account = params.loggedAccount as Account
      if (!isLogged || article.author.accountId !== account.accountId) throw new ResourceNotFoundError()
    }
    return result
  }
}

describe('Hide Unpublished Article Controller', () => {
  let sut: HideUnpublishedArticleController
  let spy: ControllerSpy

  beforeEach(() => {
    sut = new HideUnpublishedArticleController()
    spy = new ControllerSpy()
    spy.result = {
      body: mockArticle({ authorId: '123' }),
      statusCode: 200
    }
    sut.setNext(spy)
  })

  test('Should call super handler ', async () => {
    const params = mockArticle()
    spy.result = {
      body: mockArticle({ isPublished: true }),
      statusCode: 200
    }

    await sut.handle(params)

    expect(spy.params).toStrictEqual(params)
  })

  test('Should throw ResourceNotFoundError case article is unpublished and user not logged', async () => {
    const promise = sut.handle({})

    await expect(promise).rejects.toThrow(ResourceNotFoundError)
  })

  test('Should throw ResourceNotFoundError case article is unpublished and user logged is not the author', async () => {
    const loggedAccount = mockAccount()
    spy.result = {
      body: mockArticle({ authorId: 'invalid account id' }),
      statusCode: 200
    }
    const promise = sut.handle({ loggedAccount })

    await expect(promise).rejects.toThrow(ResourceNotFoundError)
  })

  test('Should return the result case user logged is the article author', async () => {
    const loggedAccount = mockAccount()

    const result = await sut.handle({ loggedAccount })

    expect(spy.result).toStrictEqual(result)
  })

  test('Should return the result case article is published', async () => {
    spy.result = {
      body: mockArticle({ isPublished: true }),
      statusCode: 200
    }

    const result = await sut.handle({})

    expect(spy.result).toStrictEqual(result)
  })
})
