import { authorizationHeader } from './authorization'
import { emailSchema, rolesSchema, tags } from './commons'

import builder from 'fluent-json-schema'

export const createAccount = builder
  .object()
  .description('Create account object')
  .definition('personalData', builder.object()
    .id('#personalData')
    .description('Personal data object')
    .prop('firstName', builder.string())
    .prop('lastName', builder.string())
    .prop('occupation', builder.string())
    .prop('birthDate', builder.raw({ type: 'string', format: 'date' }))
    .required(['firstName', 'lastName', 'occupation', 'birthDate']))
  .prop('personalData', builder.ref('#personalData'))
  .prop('email', emailSchema)
  .prop('password', builder.string())
  .prop('roles', rolesSchema)
  .required(['email', 'password', 'roles', 'personalData'])

export const createAccountSchema = {
  description: 'Create account schema',
  headers: authorizationHeader,
  body: createAccount,
  tags
}
