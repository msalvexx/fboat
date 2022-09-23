import { authorizationHeader } from '../../iam/schemas'
import { paramsSchema, tags } from './commons'

import builder from 'fluent-json-schema'

export const changeArticle = builder
  .object()
  .description('change article body')
  .prop('authorId', builder.string().format('uuid'))
  .prop('title', builder.string())
  .prop('content', builder.string().contentMediaType('text/html'))
  .prop('summary', builder.string())
  .prop('isFeatured', builder.boolean())
  .prop('isPublished', builder.boolean())
  .prop('coverPhoto', builder.string())
  .prop('slug', builder.string())

export const changeArticleSchema = {
  description: 'Change article schema',
  body: changeArticle,
  params: paramsSchema,
  headers: authorizationHeader,
  tags
}
