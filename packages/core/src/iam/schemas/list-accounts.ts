import { authorizationHeader } from './authorization'
import { tags } from './commons'

import builder from 'fluent-json-schema'

const defaults = {
  pageNumber: 1,
  pageSize: 10
}

const querystring = builder
  .object()
  .prop('pageNumber', builder.integer().default(defaults.pageNumber))
  .prop('pageSize', builder.integer().default(defaults.pageSize).maximum(50))

export const listAccountSchema = {
  description: 'List accounts schema',
  headers: authorizationHeader,
  querystring,
  tags
}
