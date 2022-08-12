import { emailSchema } from './commons'
import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('email', emailSchema)
  .prop('password', builder.string())
  .required(['email', 'password'])

export const loginSchema = {
  body: bodySchema
}
