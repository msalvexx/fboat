import { Account, Author } from '@fboat/core'
import { AbstractController } from './controller'

export class AccountToAuthorMapperController extends AbstractController {
  override async handle (params: any): Promise<any> {
    if ('loggedAccount' in params && !('author' in params)) {
      const { personalData, accountId }: Account = params.loggedAccount
      const { fullName: name, occupation, photo } = personalData
      const author: Author.Params = { accountId, name, occupation, photo }
      params = { ...params, author }
    }
    return await super.handle(params)
  }
}
