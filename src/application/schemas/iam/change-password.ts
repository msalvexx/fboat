import { authorizationHeader } from './authorization'
import { accountParamsSchema } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('newPassword', builder.string().required())

export const changePasswordSchema = {
  params: accountParamsSchema,
  headers: authorizationHeader,
  body: bodySchema
}
