import { AbstractController } from '@/server/shared/controllers'

import { ControllerSpy } from '@/tests/mocks/shared'
import { mockArticle } from '@/tests/mocks/content-system'

export class HideUnpublishedArticleController extends AbstractController {
  override async handle (params: any): Promise<any> {
    await super.handle(params)
    return null
  }
}

describe('Hide Unpublished Article Controller', () => {
  let sut: HideUnpublishedArticleController
  let spy: ControllerSpy

  beforeEach(() => {
    sut = new HideUnpublishedArticleController()
    spy = new ControllerSpy()
    sut.setNext(spy)
  })

  test('Should call super handler ', async () => {
    const params = mockArticle()

    await sut.handle(params)

    expect(spy.params).toStrictEqual(params)
  })
})
