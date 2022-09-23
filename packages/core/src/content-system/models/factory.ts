import { CreateArticle } from '../protocols'
import { Article } from './article'
import { newUuid } from '../../shared/gateways'

export const createArticle = (params: CreateArticle.Params): Article => {
  return new Article({
    ...params,
    articleId: newUuid(),
    author: {
      accountId: params.author.accountId,
      name: params.author.name,
      occupation: params.author.occupation,
      photo: params.author.photo
    }
  })
}
