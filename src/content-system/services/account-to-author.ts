import { Author, Middleware } from '@/content-system/domain'

export const accountToAuthorHandler: Middleware = handler => async (params: any) => {
  if ('loggedAccount' in params) {
    const author: Author.Params = {
      accountId: params.loggedAccount.accountId,
      name: params.loggedAccount.personalData.fullName,
      occupation: params.loggedAccount.personalData.occupation,
      photo: params.loggedAccount.photo
    }
    params = { ...params, author }
  }
  return await handler(params)
}
