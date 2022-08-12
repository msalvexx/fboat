import { getAvailableRoleNames } from '@/iam'
import { authorizationHeader } from './authorization'
import { accountParamsSchema } from './get-account'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('firstName', builder.string())
  .prop('lastName', builder.string())
  .prop('occupation', builder.string())
  .prop('birthDate', builder.raw({ type: 'string', format: 'date' }))
  .prop('roles', builder.array().minItems(1).items(builder.enum(getAvailableRoleNames)))
  .required(['firstName', 'lastName', 'occupation', 'birthDate', 'roles'])

export const changeAccountSchema = {
  params: accountParamsSchema,
  headers: authorizationHeader,
  body: bodySchema
}
