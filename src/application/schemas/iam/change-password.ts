import { authorizationHeader } from './authorization'
import { accountParamsSchema, defaultResponseSchema } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .description('Change password object')
  .prop('newPassword', builder.string().required())

export const changePasswordSchema = {
  description: 'Change password schema',
  params: accountParamsSchema,
  headers: authorizationHeader,
  body: bodySchema,
  response: defaultResponseSchema
}
