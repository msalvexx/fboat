import { emailSchema, tags } from './commons'

import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .description('Login object')
  .prop('email', emailSchema)
  .prop('password', builder.string())
  .required(['email', 'password'])

export const loginSchema = {
  description: 'Login schema',
  body: bodySchema,
  tags
}
