import { authorizationHeader } from './authorization'

import builder from 'fluent-json-schema'

export const accountParamsSchema = builder
  .object()
  .prop('email', builder.string().format(builder.FORMATS.EMAIL).required())

export const getAccountSchema = {
  params: accountParamsSchema,
  headers: authorizationHeader
}
