import { authorizationHeader } from './authorization'
import { accountParamsSchema, personalDataSchema, rolesSchema } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('roles', rolesSchema)
  .definition('personalData', personalDataSchema)
  .required(['personalData', 'roles'])

export const changeAccountSchema = {
  params: accountParamsSchema,
  headers: authorizationHeader,
  body: bodySchema
}
