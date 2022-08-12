import { authorizationHeader } from './authorization'
import { accountParamsSchema } from './commons'

export const getAccountSchema = {
  params: accountParamsSchema,
  headers: authorizationHeader
}
