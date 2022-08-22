import { authorizationHeader } from '@/shared/application/schemas/iam/authorization'

import builder from 'fluent-json-schema'

const paramsSchema = builder
  .object()
  .description('article id or slug')
  .prop('id', builder.string().required())

export const getArticleSchema = {
  description: 'Get article schema',
  params: paramsSchema,
  headers: authorizationHeader
}
