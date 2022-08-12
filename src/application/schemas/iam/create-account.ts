import { getAvailableRoleNames } from '@/iam'
import { authorizationHeader } from './authorization'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('email', builder.string().format(builder.FORMATS.EMAIL))
  .prop('password', builder.string())
  .prop('firstName', builder.string())
  .prop('lastName', builder.string())
  .prop('occupation', builder.string())
  .prop('birthDate', builder.raw({ type: 'string', format: 'date' }))
  .prop('roles', builder.array().minItems(1).items(builder.enum(getAvailableRoleNames)))
  .required(['email', 'firstName', 'lastName', 'password', 'occupation', 'birthDate', 'roles'])

export const createAccountSchema = {
  body: bodySchema,
  headers: authorizationHeader
}
