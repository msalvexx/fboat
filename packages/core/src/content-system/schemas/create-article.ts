import { authorizationHeader } from '../../iam/schemas'
import { tags } from './commons'

import builder from 'fluent-json-schema'

export const createArticle = builder
  .object()
  .description('article body')
  .prop('title', builder.string().required())
  .prop('content', builder.string().contentMediaType('text/html').required())
  .prop('summary', builder.string().required())
  .prop('coverPhoto', builder.string().required())
  .prop('slug', builder.string())

export const createArticleSchema = {
  description: 'Get article schema',
  body: createArticle,
  headers: authorizationHeader,
  tags
}
