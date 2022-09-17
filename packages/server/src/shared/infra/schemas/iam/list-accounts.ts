import { ListAccountsRepository } from '@/server/iam/protocols'
import { authorizationHeader } from './authorization'
import { tags } from './commons'
import builder from 'fluent-json-schema'

const querystring = builder
  .object()
  .prop('pageNumber', builder.integer().default(ListAccountsRepository.Default.pageNumber))
  .prop('pageSize', builder.integer().default(ListAccountsRepository.Default.pageSize).maximum(50))

export const listAccountSchema = {
  description: 'List accounts schema',
  headers: authorizationHeader,
  querystring,
  tags
}
