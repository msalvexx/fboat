import { AbstractController } from '@/server/shared/controllers'

import { ControllerSpy } from '@/tests/mocks/shared'
import { mockArticle } from '@/tests/mocks/content-system'
import { mockAccount } from '@/tests/mocks/iam'
import { GetArticle, ResourceNotFoundError } from '@fboat/core'

export class HideUnpublishedArticleController extends AbstractController {
  override async handle (params: any): Promise<any> {
    const result = await super.handle(params)
    const article = result.body as GetArticle.Result
    if (!article.isPublished) {
      const isLogged = 'loggedAccount' in params
      if (!isLogged) throw new ResourceNotFoundError()
    }
    return null
  }
}

describe('Hide Unpublished Article Controller', () => {
  let sut: HideUnpublishedArticleController
  let spy: ControllerSpy

  beforeEach(() => {
    sut = new HideUnpublishedArticleController()
    spy = new ControllerSpy()
    spy.result = {
      body: mockArticle(),
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
})
