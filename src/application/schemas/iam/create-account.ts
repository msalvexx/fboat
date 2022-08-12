import { authorizationHeader } from './authorization'
import { emailSchema, personalDataSchema, rolesSchema } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('email', emailSchema)
  .prop('password', builder.string())
  .prop('roles', rolesSchema)
  .definition('personalData', personalDataSchema)
  .required(['email', 'password', 'roles', 'personalData'])

export const createAccountSchema = {
  body: bodySchema,
  headers: authorizationHeader
}
