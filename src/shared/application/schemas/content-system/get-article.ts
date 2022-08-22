import { authorizationHeader } from '@/shared/application/schemas/iam/authorization'
import { paramsSchema } from './commons'

export const getArticleSchema = {
  description: 'Get article schema',
  params: paramsSchema,
  headers: authorizationHeader
}
