import { authorizationHeader } from '@/shared/infra/gateways/schemas/iam'
import { paramsSchema, tags } from './commons'

export const deleteArticleSchema = {
  description: 'Delete article schema',
  params: paramsSchema,
  headers: authorizationHeader,
  tags
}
