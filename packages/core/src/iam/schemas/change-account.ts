import { authorizationHeader } from './authorization'
import { accountParamsSchema, defaultResponseSchema, rolesSchema, tags } from './commons'

import builder from 'fluent-json-schema'

export const changeAccount = builder
  .object()
  .description('Change account object')
  .prop('roles', rolesSchema)
  .definition('personalData', builder.object()
    .id('#personalData')
    .description('Personal data object')
    .prop('firstName', builder.string())
    .prop('lastName', builder.string())
    .prop('occupation', builder.string())
    .prop('birthDate', builder.raw({ type: 'string', format: 'date' }))
    .required(['firstName', 'lastName', 'occupation', 'birthDate']))
  .prop('personalData', builder.ref('#personalData'))
  .required(['personalData', 'roles'])

export const changeAccountSchema = {
  description: 'Change account schema',
  params: accountParamsSchema,
  headers: authorizationHeader,
  body: changeAccount,
  response: defaultResponseSchema,
  tags
}
