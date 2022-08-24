import builder from 'fluent-json-schema'

const querystring = builder
  .object()
  .prop('pageNumber', builder.integer())
  .prop('pageSize', builder.integer())
  .prop('mostRecent', builder.boolean())
  .prop('authorId', builder.string().format('uuid'))
  .prop('isFeatured', builder.boolean())
  .prop('isPublished', builder.boolean())

export const listArticleSchema = {
  description: 'List articles schema',
  querystring
}
