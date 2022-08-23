import { Author } from '@/content-system/domain'
import { Account } from '@/iam/domain/model'
import { AbstractHandler } from './handler'

export class AccountToAuthorMapperHandler extends AbstractHandler {
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
