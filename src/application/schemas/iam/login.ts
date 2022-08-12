import builder from 'fluent-json-schema'

const bodySchema = builder
  .object()
  .prop('email', builder.string().format(builder.FORMATS.EMAIL))
  .prop('password', builder.string())
  .required(['email', 'password'])

export const loginSchema = {
  body: bodySchema
}
