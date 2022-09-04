import builder from 'fluent-json-schema'

export const personalDataSchema = builder
  .object()
  .id('#personalData')
  .description('Personal data object')
  .prop('firstName', builder.string())
  .prop('lastName', builder.string())
  .prop('occupation', builder.string())
  .prop('birthDate', builder.raw({ type: 'string', format: 'date' }))
  .required(['firstName', 'lastName', 'occupation', 'birthDate'])

export const accountParamsSchema = builder
  .object()
  .description('AccountId parameter')
  .prop('accountId', builder.string().format('uuid').required())

export const defaultResponseSchema = {
  default: {
    description: 'Successfull response',
    type: 'boolean'
  }
}

export const rolesSchema = builder.array().minItems(1)
export const emailSchema = builder.string().format(builder.FORMATS.EMAIL)
export const commonSchemas = builder
  .object()
  .id('commons')
  .definition('personalDataSchema', personalDataSchema)

export const tags = ['iam']
