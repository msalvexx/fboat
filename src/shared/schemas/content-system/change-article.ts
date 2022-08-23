import { authorizationHeader } from '@/shared/schemas/iam/authorization'
import { paramsSchema } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .description('change article body')
  .prop('authorId', builder.string().format('uuid'))
  .prop('title', builder.string())
  .prop('content', builder.string().contentMediaType('text/html'))
  .prop('summary', builder.string())
  .prop('coverPhoto', builder.string())
  .prop('slug', builder.string())

export const changeArticleSchema = {
  description: 'Change article schema',
  body: bodySchema,
  params: paramsSchema,
  headers: authorizationHeader
}
