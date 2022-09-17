import builder from 'fluent-json-schema'

export const paramsSchema = builder
  .object()
  .description('article id or slug')
  .prop('idOrSlug', builder.string().required())

export const tags = ['content-system']
