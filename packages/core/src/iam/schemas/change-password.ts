import { authorizationHeader } from './authorization'
import { accountParamsSchema, defaultResponseSchema, tags } from './commons'

import builder from 'fluent-json-schema'

export const changePassword = builder
  .object()
  .description('Change password object')
  .prop('newPassword', builder.string().required())

export const changePasswordSchema = {
  description: 'Change password schema',
  params: accountParamsSchema,
  headers: authorizationHeader,
  body: changePassword,
  response: defaultResponseSchema,
  tags
}
