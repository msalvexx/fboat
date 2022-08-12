import { getAvailableRoleNames } from '@/iam'
import builder from 'fluent-json-schema'

export const personalDataSchema = builder
  .object()
  .prop('firstName', builder.string())
  .prop('lastName', builder.string())
  .prop('occupation', builder.string())
  .prop('birthDate', builder.raw({ type: 'string', format: 'date' }))
  .required(['firstName', 'lastName', 'occupation', 'birthDate'])

export const accountParamsSchema = builder
  .object()
  .prop('accountId', builder.string().format('uuid').required())

export const rolesSchema = builder.array().minItems(1).items(builder.enum(getAvailableRoleNames))
export const emailSchema = builder.string().format(builder.FORMATS.EMAIL)
