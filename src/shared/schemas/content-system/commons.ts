import builder from 'fluent-json-schema'

export const paramsSchema = builder
  .object()
  .description('article id or slug')
  .prop('id', builder.string().required())
