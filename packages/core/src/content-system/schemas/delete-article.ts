import { authorizationHeader } from '../../iam/schemas'
import { paramsSchema, tags } from './commons'

export const deleteArticleSchema = {
  description: 'Delete article schema',
  params: paramsSchema,
  headers: authorizationHeader,
  tags
}
