import { tags } from './commons'

import builder from 'fluent-json-schema'

const defaults = {
  isFeatured: false,
  isPublished: true,
  mostRecent: true,
  pageNumber: 1,
  pageSize: 10
}

const querystring = builder
  .object()
  .prop('pageNumber', builder.integer().default(defaults.pageNumber))
  .prop('pageSize', builder.integer().default(defaults.pageSize).maximum(50))
  .prop('mostRecent', builder.boolean().default(defaults.mostRecent))
  .prop('isFeatured', builder.boolean().default(defaults.isFeatured))
  .prop('isPublished', builder.boolean().default(defaults.isPublished))
  .prop('authorId', builder.string().format('uuid'))

export const listArticleSchema = {
  description: 'List articles schema',
  querystring,
  tags
}
