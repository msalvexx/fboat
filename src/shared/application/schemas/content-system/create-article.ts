import { authorizationHeader } from '@/shared/application/schemas/iam/authorization'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .description('article body')
  .prop('title', builder.string().required())
  .prop('content', builder.string().contentMediaType('text/html').required())
  .prop('summary', builder.string().required())
  .prop('coverPhoto', builder.string().required())
  .prop('slug', builder.string())

export const createArticleSchema = {
  description: 'Get article schema',
  body: bodySchema,
  headers: authorizationHeader
}
