import { CreateArticle } from '../protocols'
import { Article } from './article'
import { newUuid } from '@/shared/infra/adapters'

export const createArticle = (params: CreateArticle.Params, defaultPhoto: string | null): Article => {
  return new Article({
    ...params,
    articleId: newUuid(),
    author: {
      accountId: params.author.accountId,
      name: params.author.name,
      occupation: params.author.occupation,
      defaultPhoto
    }
  })
}
