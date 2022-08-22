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

export const authorIdHandler: Middleware = handler => async (params: any) => {
  if ('authorId' in params) {
    params.author = params.author ?? {}
    params.author = {
      ...params.author,
      accountId: params.authorId
    }
  }
  return await handler(params)
}
