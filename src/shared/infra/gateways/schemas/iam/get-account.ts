import { authorizationHeader } from './authorization'
import { accountParamsSchema } from './commons'

export const getAccountSchema = {
  description: 'Get account schema',
  params: accountParamsSchema,
  headers: authorizationHeader
}
