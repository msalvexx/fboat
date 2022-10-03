import { Account, GetArticle, ResourceNotFoundError } from '@fboat/core'
import { AbstractController } from './controller'

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
